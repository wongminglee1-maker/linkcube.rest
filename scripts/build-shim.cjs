const { spawnSync } = require('child_process');
const path = require('path');

console.log('[LinkCube CI Shim] Intercepted build call. Executing Astro static build...');

const astroBin = path.resolve('node_modules/.bin/astro');
const isWin = process.platform === 'win32';
const cmd = isWin ? `${astroBin}.cmd` : astroBin;

const buildRes = spawnSync(cmd, ['build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

if (buildRes.status !== 0) {
  process.exit(buildRes.status || 1);
}

const sitemapScript = path.resolve('scripts/generate-sitemap.mjs');
const sitemapRes = spawnSync('node', [sitemapScript], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

process.exit(sitemapRes.status || 0);
