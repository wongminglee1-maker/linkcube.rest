const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.resolve('C:/Users/USERR/.gemini/antigravity/brain/1c99637b-94f7-4e89-a483-11f1fe302737/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Homepage
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:4324/', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: path.join(outDir, 'homepage-desktop.png'), fullPage: false });
  console.log('Saved homepage-desktop.png');

  // 2. Mobile Homepage
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:4324/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(outDir, 'homepage-mobile.png'), fullPage: false });
  console.log('Saved homepage-mobile.png');

  // 3. Pricing Page
  await desktopPage.goto('http://localhost:4324/pricing/', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: path.join(outDir, 'pricing-desktop.png'), fullPage: false });
  console.log('Saved pricing-desktop.png');

  // 4. Guides Page
  await desktopPage.goto('http://localhost:4324/guides/', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: path.join(outDir, 'guides-desktop.png'), fullPage: false });
  console.log('Saved guides-desktop.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
