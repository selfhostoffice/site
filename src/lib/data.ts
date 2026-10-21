import raw from '../data/listings.json';
export type L = typeof raw[number];
export const SITE_NAME = 'SelfHost Office';
export const listings: L[] = [...raw].sort((a, b) => b.stars - a.stars);
export const CATS: Record<string, string> = {
  'e-signature': 'E-signature', scheduling: 'Scheduling & booking', invoicing: 'Invoicing', accounting: 'Accounting & ERP',
  crm: 'CRM', helpdesk: 'Helpdesk & live chat', 'time-tracking': 'Time tracking', hr: 'HR & people', forms: 'Forms & surveys',
  'email-marketing': 'Email marketing', documents: 'Documents & PDF', 'project-management': 'Project management',
  analytics: 'Web analytics', inventory: 'Inventory', pos: 'Point of sale' };
export const cats = Object.keys(CATS).filter(c => listings.some(l => l.category === c));
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const products = [...new Set(listings.map(l => l.replaces))];
export const fmtDate = (s: string) => s.slice(0, 10);
