const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.resolve('C:/Users/USERR/.gemini/antigravity/brain/1c99637b-94f7-4e89-a483-11f1fe302737/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop full homepage
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(outDir, 'homepage-desktop.png') });
  console.log('Saved homepage-desktop.png');

  // 2. Reviews Section (without disclaimer)
  const reviewsEl = await desktopPage.$('#reviews');
  if (reviewsEl) {
    await reviewsEl.screenshot({ path: path.join(outDir, 'reviews-clean.png') });
    console.log('Saved reviews-clean.png');
  }

  // 3. Footer (without disclaimer)
  const footerEl = await desktopPage.$('footer.site-footer');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(outDir, 'footer-clean.png') });
    console.log('Saved footer-clean.png');
  }

  // 4. Region story
  const regionEl = await desktopPage.$('#regions-story');
  if (regionEl) {
    await regionEl.screenshot({ path: path.join(outDir, 'regions-clean.png') });
    console.log('Saved regions-clean.png');
  }

  // 5. Mobile homepage
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(outDir, 'homepage-mobile.png') });
  console.log('Saved homepage-mobile.png');

  await browser.close();
  console.log('Screenshots completed!');
})();
