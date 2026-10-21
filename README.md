# SelfHost Office (working name)
Open-source, self-hostable back-office software for small businesses.
- `npm run seed`: re-fetches listing facts from the public GitHub REST API (scripts/repos.tsv → src/data/listings.json). Set GITHUB_TOKEN to avoid the 60 req/h anonymous limit. Failed fetches keep the previous record.
- `npm run build`: static build to dist/ (Cloudflare Pages: build `npm run build`, output `dist`).
Category and "replaces" columns in repos.tsv are editorial; all other fields come from GitHub.
