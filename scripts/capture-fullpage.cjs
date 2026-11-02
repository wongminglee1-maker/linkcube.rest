const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.resolve('C:/Users/USERR/.gemini/antigravity/brain/1c99637b-94f7-4e89-a483-11f1fe302737/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Fullpage Homepage
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'homepage-fullpage.png'), fullPage: true });
  console.log('Saved homepage-fullpage.png');

  // 2. Pricing Page Fullpage
  await page.goto('http://localhost:4322/pricing/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'pricing-fullpage.png'), fullPage: true });
  console.log('Saved pricing-fullpage.png');

  // 3. Guides Page Fullpage
  await page.goto('http://localhost:4322/guides/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'guides-fullpage.png'), fullPage: true });
  console.log('Saved guides-fullpage.png');

  // 4. One representative article page
  await page.goto('http://localhost:4322/guides/linkcube-entry-exit/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'article-detail.png'), fullPage: true });
  console.log('Saved article-detail.png');

  await browser.close();
  console.log('All fullpage screenshots captured successfully!');
})();
