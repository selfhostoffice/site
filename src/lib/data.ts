import raw from '../data/listings.json';
export type L = typeof raw[number];
export const SITE_NAME = 'SelfHost Office';
export const listings: L[] = [...raw].sort((a, b) => b.stars - a.stars);
export const CATS: Record<string, { name: string; icon: string; blurb: string }> = {
  'e-signature': { name: 'E-signature', icon: 'pen', blurb: 'Send, sign and archive contracts' },
  scheduling: { name: 'Scheduling', icon: 'calendar', blurb: 'Booking pages and polls' },
  invoicing: { name: 'Invoicing', icon: 'receipt', blurb: 'Quotes, invoices, payments' },
  accounting: { name: 'Accounting & ERP', icon: 'ledger', blurb: 'Books, ERP and finance' },
  crm: { name: 'CRM', icon: 'users', blurb: 'Contacts, deals and pipelines' },
  helpdesk: { name: 'Helpdesk & chat', icon: 'chat', blurb: 'Support inbox and live chat' },
  'time-tracking': { name: 'Time tracking', icon: 'clock', blurb: 'Timesheets and billable hours' },
  hr: { name: 'HR & people', icon: 'badge', blurb: 'Staff, leave and payroll data' },
  forms: { name: 'Forms & surveys', icon: 'form', blurb: 'Forms, surveys and chatbots' },
  'email-marketing': { name: 'Email marketing', icon: 'mail', blurb: 'Newsletters and automation' },
  documents: { name: 'Documents & files', icon: 'file', blurb: 'PDFs, files and archives' },
  'project-management': { name: 'Projects', icon: 'kanban', blurb: 'Tasks, boards and roadmaps' },
  analytics: { name: 'Web analytics', icon: 'chart', blurb: 'Privacy-friendly site stats' },
  inventory: { name: 'Inventory', icon: 'box', blurb: 'Stock, parts and suppliers' },
  pos: { name: 'Point of sale', icon: 'store', blurb: 'Checkout and retail sales' },
  'team-chat': { name: 'Team chat', icon: 'chat', blurb: 'Channels, DMs and calls' },
  'knowledge-base': { name: 'Wiki & docs', icon: 'file', blurb: 'Team wikis and shared notes' },
  databases: { name: 'No-code databases', icon: 'form', blurb: 'Spreadsheet-style databases' },
  automation: { name: 'Workflow automation', icon: 'pulse', blurb: 'Zapier-style workflows and integrations' },
  passwords: { name: 'Password managers', icon: 'badge', blurb: 'Shared vaults and credentials' },
  backend: { name: 'App backends', icon: 'box', blurb: 'Postgres, auth and file storage for apps' },
};
export const catName = (c: string) => CATS[c]?.name ?? c;
export const cats = Object.keys(CATS).filter(c => listings.some(l => l.category === c));
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const products = [...new Set(listings.map(l => l.replaces))].sort();
export const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const COPYLEFT = ['AGPL-3.0', 'GPL-3.0', 'GPL-2.0', 'LGPL-3.0', 'LGPL-2.1', 'MPL-2.0', 'OSL-3.0'];
const PERMISSIVE = ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'BSD-2-Clause', 'ISC'];
export const licFamily = (l: string) => COPYLEFT.includes(l) ? 'copyleft' : PERMISSIVE.includes(l) ? 'permissive' : 'other';
export const licLabel = (l: string) => l === 'NOASSERTION' ? 'Custom / see repo' : l;
/** days between last push and the fetch time (both from GitHub data, so stable across builds) */
export const daysSincePush = (l: L) => Math.max(0, Math.round((Date.parse(l.fetchedAt) - Date.parse(l.lastPush)) / 864e5));
export const activity = (l: L) => l.archived ? 'archived' : daysSincePush(l) <= 30 ? 'active' : daysSincePush(l) <= 180 ? 'slowing' : 'stale';
export const activityLabel = (l: L) => ({ archived: 'Archived', active: 'Active', slowing: 'Slowing', stale: 'Stale' } as any)[activity(l)];
export const kfmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : String(n);
export const avatar = (l: L, s = 64) => `${l.ownerAvatar}${l.ownerAvatar.includes('?') ? '&' : '?'}s=${s}`;
/** Editorial guides (pricing / cost pages), linked from the tool pages they cover */
export const GUIDES = [
  { href: '/pricing/n8n/', title: 'n8n pricing: Cloud vs self-hosted, real monthly cost', tools: ['n8n-io--n8n'], checked: 'Oct 2026' },
  { href: '/pricing/cal-com/', title: 'Cal.com pricing: cloud plans vs self-hosting Cal.diy', tools: ['calcom--cal.diy'], checked: 'Oct 2026' },
  { href: '/compare/n8n-vs-make/', title: 'n8n vs Make: what 2,500, 10,000 and 50,000 runs a month really cost', tools: ['n8n-io--n8n'], checked: 'Oct 2026' },
  { href: '/pricing/chatwoot/', title: 'Chatwoot pricing: cloud plans vs self-hosting', tools: ['chatwoot--chatwoot'], checked: 'Nov 2026' },
  { href: '/pricing/n8n-server-requirements/', title: 'n8n server requirements: measured RAM and the server to buy', tools: ['n8n-io--n8n'], checked: 'Oct 2026' },
  { href: '/pricing/supabase/', title: 'Supabase pricing: cloud plans vs self-hosting, and what you give up', tools: ['supabase--supabase'], checked: 'Oct 2026' },
  { href: '/compare/hetzner-vs-digitalocean-vs-vultr/', title: 'Hetzner vs DigitalOcean vs Vultr: what a 2, 4 or 8 GB server costs', tools: [], checked: 'Oct 2026' },
  { href: '/compare/ghost-vs-beehiiv-vs-listmonk/', title: 'Ghost vs beehiiv vs listmonk: what a newsletter costs at 1,000, 5,000 and 10,000 subscribers', tools: ['knadh--listmonk'], checked: 'Oct 2026' },
  { href: '/compare/bitwarden-vs-vaultwarden-vs-1password/', title: 'Bitwarden vs Vaultwarden vs 1Password: what a password manager costs for 1, 6, 10 and 25 people', tools: ['dani-garcia--vaultwarden', 'bitwarden--server'], checked: 'Oct 2026' },
  { href: '/compare/plausible-vs-umami-vs-google-analytics/', title: 'Plausible vs Umami vs Google Analytics: what web analytics costs at 10K to 5M pageviews', tools: ['umami-software--umami', 'plausible--analytics'], checked: 'Nov 2026' },
  { href: '/compare/pocketbase-vs-supabase-vs-appwrite/', title: 'PocketBase vs Supabase vs Appwrite: what an app backend costs, cloud and self-hosted', tools: ['pocketbase--pocketbase', 'supabase--supabase', 'appwrite--appwrite'], checked: 'Nov 2026' },
  { href: '/compare/railway-vs-render-vs-fly/', title: 'Railway vs Render vs Fly.io: what it costs to host n8n, Umami, Vaultwarden and PocketBase', tools: ['n8n-io--n8n', 'umami-software--umami', 'dani-garcia--vaultwarden', 'pocketbase--pocketbase'], checked: 'Nov 2026' },
  { href: '/compare/mattermost-vs-slack/', title: 'Mattermost vs Slack: what team chat costs for 10, 25 and 50 people', tools: ['mattermost--mattermost', 'rocketchat--rocket.chat'], checked: 'Nov 2026' },
  { href: '/compare/nocodb-vs-baserow-vs-airtable/', title: 'NocoDB vs Baserow vs Airtable: what a team database costs for 5, 10 and 25 editors', tools: ['nocodb--nocodb', 'baserow--baserow'], checked: 'Nov 2026' },
  { href: '/compare/docusign-vs-docuseal-vs-documenso/', title: 'DocuSign vs DocuSeal vs Documenso: what e-signatures cost for 1, 3 and 10 senders', tools: ['docusealco--docuseal', 'documenso--documenso'], checked: 'Nov 2026' },
  { href: '/compare/akaunting-vs-invoice-ninja-vs-quickbooks/', title: 'Akaunting vs Invoice Ninja vs QuickBooks: what accounting software costs for 1, 3 and 10 people', tools: ['akaunting--akaunting', 'invoiceninja--invoiceninja'], checked: 'Nov 2026' },
  { href: '/compare/zendesk-vs-chatwoot-vs-freescout-vs-zammad/', title: 'Zendesk vs Chatwoot vs FreeScout vs Zammad: what a helpdesk costs for 3, 10 and 25 agents', tools: ['chatwoot--chatwoot', 'freescout-help-desk--freescout', 'zammad--zammad'], checked: 'Nov 2026' },
  { href: '/compare/mailchimp-vs-mailerlite-vs-listmonk-vs-mautic/', title: 'Mailchimp vs MailerLite vs listmonk vs Mautic: what email marketing costs at 1,500, 5,000 and 10,000 contacts', tools: ['knadh--listmonk', 'mautic--mautic'], checked: 'Nov 2026' },
  { href: '/compare/coolify-vs-vercel/', title: 'Coolify vs Vercel: what hosting an app costs for 1, 3 and 5 developers', tools: [], checked: 'Nov 2026' },
  { href: '/compare/proton-vs-fastmail-vs-mailcow/', title: 'Proton Mail vs Fastmail vs Mailcow: what business email costs for 1, 5 and 10 people', tools: [], checked: 'Nov 2026' },
  { href: '/compare/notion-vs-appflowy-vs-affine/', title: 'Notion vs AppFlowy vs AFFiNE: what a team wiki costs for 5, 10 and 25 people', tools: ['appflowy-io--appflowy', 'toeverything--affine'], checked: 'Nov 2026' },
];
