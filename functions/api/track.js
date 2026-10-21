// First-party click/claim tracking. Needs a KV binding named TRACK_KV (free tier).
const TYPES = ['outbound', 'claim_cta', 'claim_submit', 'test'];
export async function onRequestPost({ request, env }) {
  if (!env.TRACK_KV) return new Response('tracking not configured', { status: 503 });
  let b; try { b = await request.json(); } catch { return new Response('bad json', { status: 400 }); }
  const s = (v, n = 120) => (typeof v === 'string' ? v.slice(0, n) : null);
  const type = TYPES.includes(b.type) ? b.type : null;
  if (!type) return new Response('bad type', { status: 400 });
  const ev = { type, tool: s(b.tool), kind: s(b.kind, 30), href: s(b.href, 300), path: s(b.path, 200),
    utm_source: s(b.utm_source, 60), utm_campaign: s(b.utm_campaign, 80), ts: new Date().toISOString(),
    country: request.cf?.country || null, test: type === 'test' || b.test === true };
  const key = `ev:${ev.ts}:${crypto.randomUUID().slice(0, 8)}`;
  await env.TRACK_KV.put(key, JSON.stringify(ev), { expirationTtl: 60 * 60 * 24 * 400 });
  return new Response(null, { status: 204 });
}
export const onRequestGet = () => new Response('POST only', { status: 405 });
