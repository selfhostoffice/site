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
