import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({ site: 'https://selfhostoffice.com', integrations: [sitemap()] });
