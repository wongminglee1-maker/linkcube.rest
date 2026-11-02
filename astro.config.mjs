import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://linkcube.rest',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/preview') &&
        !page.endsWith('/404/')
    })
  ],
  output: 'static',
  build: {
    format: 'directory'
  }
});
