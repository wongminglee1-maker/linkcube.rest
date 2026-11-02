import fs from 'node:fs';
import path from 'node:path';

export function ensureSitemap() {
  const distDir = path.resolve('dist');
  const publicDir = path.resolve('public');
  const sitemap0 = path.join(distDir, 'sitemap-0.xml');
  const targetSitemap = path.join(distDir, 'sitemap.xml');
  const publicSitemap = path.join(publicDir, 'sitemap.xml');

  const today = '2026-10-31';

  const urls = [
    { loc: 'https://linkcube.rest/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://linkcube.rest/regions/', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://linkcube.rest/pricing/', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://linkcube.rest/data-methodology/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/guides/', priority: '0.9', changefreq: 'daily' },
    { loc: 'https://linkcube.rest/guides/linkcube-region-evidence/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/guides/linkcube-entry-exit/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/guides/linkcube-time-series/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/guides/linkcube-data-quality/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/guides/linkcube-pricing-sources/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/guides/linkcube-region-updates/', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/about/', priority: '0.6', changefreq: 'monthly' },
    { loc: 'https://linkcube.rest/privacy/', priority: '0.5', changefreq: 'yearly' },
    { loc: 'https://linkcube.rest/terms/', priority: '0.5', changefreq: 'yearly' }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(publicSitemap, xmlContent, 'utf8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(targetSitemap, xmlContent, 'utf8');
  }

  console.log(`[PASS] sitemap.xml 生成完毕，共收录 ${urls.length} 个正式页面，排除 404 与非正式页面。`);
}

if (process.argv[1]?.endsWith('generate-sitemap.mjs')) {
  ensureSitemap();
}
