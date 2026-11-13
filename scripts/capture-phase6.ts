import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR =
  'C:\\Users\\Himanshu Kaushal\\.gemini\\antigravity\\brain\\061900ed-db78-408e-97dc-d009e51625cc';
const CHROME_PATH =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:4173/';

async function run() {
  console.log('🚀 Launching Chrome for Phase 6 Stretch Features Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Open Command Palette via Keyboard (Ctrl+K)
  console.log('📸 1. Opening Command Palette via Ctrl+K...');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyK');
  await page.keyboard.up('Control');
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase6_command_palette.png'),
  });

  // Close palette with Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  // 2. Open Interactive Terminal via Header Button
  console.log('📸 2. Opening Interactive Terminal...');
  const terminalBtn = await page.$(
    'header button[aria-label="Open interactive developer terminal"]'
  );
  if (terminalBtn) {
    await terminalBtn.click();
    await new Promise((r) => setTimeout(r, 600));

    // Type 'help' and enter
    await page.keyboard.type('help');
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 400));

    // Type 'skills' and enter
    await page.keyboard.type('skills');
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 400));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'phase6_interactive_terminal.png'),
    });
  }

  await browser.close();
  console.log('✨ All Phase 6 stretch screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Phase 6 capture error:', err);
  process.exit(1);
});

