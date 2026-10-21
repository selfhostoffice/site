// GET /api/stats  header "x-stats-secret: <STATS_SECRET>"  -> counts by type/tool/utm.
// Add ?raw=1 for events, ?delete_test=1 to delete test events.
export async function onRequestGet({ request, env }) {
  if (!env.STATS_SECRET || request.headers.get('x-stats-secret') !== env.STATS_SECRET) return new Response('forbidden', { status: 403 });
  if (!env.TRACK_KV) return new Response('tracking not configured', { status: 503 });
  const u = new URL(request.url); const evs = []; let cursor;
  do { const r = await env.TRACK_KV.list({ prefix: 'ev:', cursor }); for (const k of r.keys) { const v = await env.TRACK_KV.get(k.name, 'json'); if (v) evs.push({ key: k.name, ...v }); } cursor = r.list_complete ? null : r.cursor; } while (cursor);
  if (u.searchParams.get('delete_test')) { const t = evs.filter(e => e.test); await Promise.all(t.map(e => env.TRACK_KV.delete(e.key))); return Response.json({ deleted: t.length }); }
  const real = evs.filter(e => !e.test); const by = f => real.reduce((a, e) => { const k = f(e) || '(none)'; a[k] = (a[k] || 0) + 1; return a; }, {});
  return Response.json({ total: real.length, test_events: evs.length - real.length, by_type: by(e => e.type), by_tool: by(e => `${e.type}:${e.tool}`), by_source: by(e => `${e.utm_source}/${e.utm_campaign}`), by_path: by(e => e.path), ...(u.searchParams.get('raw') ? { events: evs } : {}) });
}
