import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://marie-haensel.de',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/danke'),
    }),
  ],
});