import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Himanshu Kaushal\\.gemini\\antigravity\\brain\\061900ed-db78-408e-97dc-d009e51625cc';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:4173/';

async function run() {
  console.log('🚀 Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  console.log(`🌐 Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });

  // 1. Desktop 1440 x 900
  console.log('📸 Capturing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 600));
  const desktopPath = path.join(ARTIFACT_DIR, 'phase2_desktop_1440.png');
  await page.screenshot({ path: desktopPath });
  console.log(`Saved: ${desktopPath}`);

  // 2. Light Theme Check
  console.log('🌓 Toggling theme to Light Mode...');
  const themeToggle = await page.$('header button[aria-label*="Switch to"]');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise((r) => setTimeout(r, 400));
    const lightPath = path.join(ARTIFACT_DIR, 'phase2_desktop_light.png');
    await page.screenshot({ path: lightPath });
    console.log(`Saved: ${lightPath}`);

    // Switch back to Dark
    await themeToggle.click();
    await new Promise((r) => setTimeout(r, 400));
  }

  // 3. Tablet 768 x 1024
  console.log('📸 Capturing Tablet Viewport (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 500));
  const tabletPath = path.join(ARTIFACT_DIR, 'phase2_tablet_768.png');
  await page.screenshot({ path: tabletPath });
  console.log(`Saved: ${tabletPath}`);

  // 4. Mobile 390 x 844
  console.log('📸 Capturing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 500));
  const mobilePath = path.join(ARTIFACT_DIR, 'phase2_mobile_390.png');
  await page.screenshot({ path: mobilePath });
  console.log(`Saved: ${mobilePath}`);

  // 5. Mobile Menu Open
  console.log('🍔 Opening Mobile Navigation Menu...');
  const menuButton = await page.$('header button[aria-label="Toggle navigation menu"]');
  if (menuButton) {
    await menuButton.click();
    await new Promise((r) => setTimeout(r, 500));
    const menuPath = path.join(ARTIFACT_DIR, 'phase2_mobile_menu.png');
    await page.screenshot({ path: menuPath });
    console.log(`Saved: ${menuPath}`);
  }

  await browser.close();
  console.log('✨ All responsive screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});

