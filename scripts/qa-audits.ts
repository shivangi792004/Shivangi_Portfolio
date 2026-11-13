import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR =
  'C:\\Users\\Himanshu Kaushal\\.gemini\\antigravity\\brain\\061900ed-db78-408e-97dc-d009e51625cc';
const CHROME_PATH =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:4173/';

async function runQA() {
  console.log('🧪 Starting Comprehensive QA Audit Suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });

  // 1. Semantic Landmarks & H1 Check
  console.log('\n--- 1. Semantic Landmarks & Headings ---');
  const h1Count = await page.$$eval('h1', (els) => els.length);
  const h1Text = await page.$eval('h1', (el) => el.textContent?.trim());
  console.log(`h1 Count: ${h1Count} (Expected: 1)`);
  console.log(`h1 Text: "${h1Text}"`);

  const landmarks = await page.evaluate(() => {
    return {
      header: !!document.querySelector('header'),
      nav: !!document.querySelector('nav'),
      main: !!document.querySelector('main'),
      footer: !!document.querySelector('footer'),
      sections: document.querySelectorAll('section').length,
    };
  });
  console.log('Landmarks Detected:', landmarks);

  // 2. Interactive Links and Buttons Audit
  console.log('\n--- 2. Interactive Links & Buttons Audit ---');
  const linkAudit = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    const hashOnly = anchors.filter((a) => a.getAttribute('href') === '#');
    const emptyHref = anchors.filter(
      (a) => !a.getAttribute('href') || a.getAttribute('href') === ''
    );
    const validHrefs = anchors.map((a) => ({
      text: a.innerText.trim() || a.getAttribute('aria-label') || 'Icon',
      href: a.getAttribute('href'),
    }));
    return { total: anchors.length, hashOnly: hashOnly.length, emptyHref: emptyHref.length, validHrefs };
  });
  console.log(`Total Anchors: ${linkAudit.total}`);
  console.log(`Hash-only ("#") Anchors: ${linkAudit.hashOnly} (Brand logo exception)`);
  console.log(`Empty Href Anchors: ${linkAudit.emptyHref}`);

  // 3. Theme Switching & LocalStorage Persistence
  console.log('\n--- 3. Theme Toggle & Persistence ---');
  const initialClass = await page.evaluate(() =>
    document.documentElement.className
  );
  console.log(`Initial root class: "${initialClass}"`);

  // Click toggle
  await page.click('header button[aria-label*="Switch to"]');
  await new Promise((r) => setTimeout(r, 300));
  const lightClass = await page.evaluate(() =>
    document.documentElement.className
  );
  const lightStored = await page.evaluate(() =>
    localStorage.getItem('portfolio-theme')
  );
  console.log(`After 1st toggle root class: "${lightClass}", stored: "${lightStored}"`);

  // Toggle back to dark
  await page.click('header button[aria-label*="Switch to"]');
  await new Promise((r) => setTimeout(r, 300));
  const darkClass = await page.evaluate(() =>
    document.documentElement.className
  );
  const darkStored = await page.evaluate(() =>
    localStorage.getItem('portfolio-theme')
  );
  console.log(`After 2nd toggle root class: "${darkClass}", stored: "${darkStored}"`);

  // 4. Modal Keyboard Accessibility (Escape key)
  console.log('\n--- 4. Modal Keyboard Accessibility ---');
  // Open modal
  const deepDiveBtn = await page.$(
    'button[aria-label*="View architecture details for HospCare"]'
  );
  if (deepDiveBtn) {
    await deepDiveBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const isModalOpen = await page.evaluate(
      () => !!document.querySelector('[role="dialog"]')
    );
    console.log(`Modal Open after click: ${isModalOpen}`);

    // Press Escape
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));
    const isModalClosed = await page.evaluate(
      () => !document.querySelector('[role="dialog"]')
    );
    console.log(`Modal Closed after Escape key: ${isModalClosed}`);
  }

  // 5. Keyboard Navigation & Visible Focus Rings
  console.log('\n--- 5. Keyboard Navigation & Focus Rings ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  // Press tab multiple times to reach main CTA
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press('Tab');
    await new Promise((r) => setTimeout(r, 100));
  }
  const focusedElement = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tagName: el?.tagName,
      text: el?.textContent?.trim().slice(0, 30),
      className: el?.className,
    };
  });
  console.log('Focused Element via Keyboard Tab:', focusedElement);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase5_keyboard_focus.png'),
  });

  // 6. Prefers-Reduced-Motion Emulation
  console.log('\n--- 6. Prefers-Reduced-Motion Compliance ---');
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);
  const reducedMotionDetected = await page.evaluate(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  console.log(`prefers-reduced-motion active: ${reducedMotionDetected}`);

  // 7. Responsive Viewports Capture for Phase 5 Walkthrough
  console.log('\n--- 7. Responsive Viewport Captures ---');
  // Desktop 1440
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase5_desktop_1440.png'),
  });

  // Tablet 768
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase5_tablet_768.png'),
  });

  // Mobile 390
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase5_mobile_390.png'),
  });

  await browser.close();
  console.log('\n✨ All automated QA tests and responsive captures completed successfully!');
}

runQA().catch((err) => {
  console.error('QA script error:', err);
  process.exit(1);
});

