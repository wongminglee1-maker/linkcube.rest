const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4324/#story-japan', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const outDir = 'C:/Users/USERR/.gemini/antigravity/brain/1c99637b-94f7-4e89-a483-11f1fe302737/screenshots';

  const card = await page.$('#story-japan');
  if (card) {
    await card.screenshot({ path: path.join(outDir, 'regions-story-japan.png') });
    console.log('Saved regions-story-japan.png');
  }

  await page.screenshot({ path: path.join(outDir, 'regions-story-viewport.png') });
  console.log('Saved regions-story-viewport.png');

  await browser.close();
})();
