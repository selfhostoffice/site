#!/usr/bin/env python3
"""Reproducible seed: reads scripts/repos.tsv (repo, category, replaces = editorial),
fetches facts from the public GitHub REST API, writes src/data/listings.json.
Optional GITHUB_TOKEN env var raises the rate limit."""
import csv, json, os, sys, time, urllib.request
H={"Accept":"application/vnd.github+json","User-Agent":"mogul-seed"}
if os.environ.get("GITHUB_TOKEN"): H["Authorization"]="Bearer "+os.environ["GITHUB_TOKEN"]
P=os.path.join(os.path.dirname(__file__),"../src/data/listings.json")
old={x["repo"].lower():x for x in json.load(open(P))} if os.path.exists(P) else {}
out=[]; now=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())
for repo,cat,rep in csv.reader(open(os.path.join(os.path.dirname(__file__),"repos.tsv")),delimiter="\t"):
    try:
        d=json.load(urllib.request.urlopen(urllib.request.Request(f"https://api.github.com/repos/{repo}",headers=H)))
    except Exception as e:
        print("SKIP",repo,e,file=sys.stderr)
        if repo.lower() in old: out.append(old[repo.lower()])
        continue
    lic=(d.get("license") or {}).get("spdx_id") or "NOASSERTION"
    out.append({"slug":d["full_name"].replace("/","--").lower(),"name":d["name"],"repo":d["full_name"],
      "repoUrl":d["html_url"],"homepage":d.get("homepage") or None,"description":d.get("description") or "",
      "license":lic,"stars":d["stargazers_count"],"lastPush":d["pushed_at"],"archived":d["archived"],
      "ownerAvatar":d["owner"]["avatar_url"],"language":d.get("language"),"forks":d["forks_count"],"openIssues":d["open_issues_count"],"topics":d.get("topics",[])[:8],"category":cat,"replaces":rep,"source":f"https://api.github.com/repos/{d['full_name']}","fetchedAt":now})
    print("ok",repo,file=sys.stderr)
json.dump(out,open(P,"w"),indent=1)
print(len(out),"listings")
