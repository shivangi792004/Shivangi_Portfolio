import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR =
  'C:\\Users\\Himanshu Kaushal\\.gemini\\antigravity\\brain\\061900ed-db78-408e-97dc-d009e51625cc';
const CHROME_PATH =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:4173/';

async function run() {
  console.log('🚀 Launching Chrome for Phase 4 Integrations Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Capture GitHub Feed
  console.log('📸 1. Capturing GitHub Feed...');
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase4_desktop_github_feed.png'),
  });

  // 2. Test Contact Form Validation
  console.log('📸 2. Testing Contact Form Validation & State...');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Click Submit with empty fields to test validation triggers
  const submitBtn = await page.$('form button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise((r) => setTimeout(r, 400));
  }
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase4_desktop_contact_form.png'),
  });

  // 3. Test Resume link existence
  console.log('📸 3. Validating Resume Link...');
  const resumeHref = await page.evaluate(() => {
    const link = document.querySelector('a[href="/Shivangi_Singh_Resume.pdf"]');
    return link ? link.getAttribute('href') : null;
  });
  console.log('Resume Link Verified:', resumeHref);

  await browser.close();
  console.log('✨ All Phase 4 integration screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Phase 4 screenshot capture error:', err);
  process.exit(1);
});

