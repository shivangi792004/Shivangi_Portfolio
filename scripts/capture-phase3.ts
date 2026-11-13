import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR =
  'C:\\Users\\Himanshu Kaushal\\.gemini\\antigravity\\brain\\061900ed-db78-408e-97dc-d009e51625cc';
const CHROME_PATH =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:4173/';

async function run() {
  console.log('🚀 Launching Chrome for Phase 3 Visual Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });

  // 1. Desktop 1440px - Hero & About
  console.log('📸 1. Capturing Desktop Hero & About...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3_desktop_hero_about.png'),
  });

  // 2. Desktop 1440px - Scroll to Experience & Skills, Click a Skill
  console.log('📸 2. Capturing Experience & Clicked Skill Evidence...');
  await page.evaluate(() => {
    document.getElementById('skills')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  // Click React.js skill button
  const reactSkillBtn = await page.$('button[aria-label="View evidence for React.js"]');
  if (reactSkillBtn) {
    await reactSkillBtn.click();
    await new Promise((r) => setTimeout(r, 400));
  }
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3_desktop_experience_skills.png'),
  });

  // 3. Desktop 1440px - Projects & Open Architecture Deep Dive Modal
  console.log('📸 3. Capturing Projects with Architecture Deep Dive Modal...');
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  // Click "Deep Dive & Architecture" button for HospCare
  const deepDiveBtn = await page.$(
    'button[aria-label*="View architecture details for HospCare"]'
  );
  if (deepDiveBtn) {
    await deepDiveBtn.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'phase3_desktop_projects_architecture.png'),
    });
    // Close modal
    const closeBtn = await page.$('button[aria-label="Close modal"]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  // 4. Desktop 1440px - DSA & Achievements + Education
  console.log('📸 4. Capturing DSA & Education...');
  await page.evaluate(() => {
    document.getElementById('dsa')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3_desktop_dsa_education.png'),
  });

  // 5. Desktop 1440px - Contact Form & Footer
  console.log('📸 5. Capturing Contact Section & Footer...');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3_desktop_contact_footer.png'),
  });

  // 6. Tablet 768px Viewport
  console.log('📸 6. Capturing Tablet Viewport (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3_tablet_768.png'),
  });

  // 7. Mobile 390px Viewport
  console.log('📸 7. Capturing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3_mobile_390.png'),
  });

  await browser.close();
  console.log('✨ All Phase 3 screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Phase 3 screenshot capture error:', err);
  process.exit(1);
});

