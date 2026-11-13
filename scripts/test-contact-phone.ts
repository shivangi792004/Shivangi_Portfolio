import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyContact() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));

  const phoneDetails = await page.evaluate(() => {
    const link = document.querySelector('#contact a[href^="tel:"]');
    return link ? {
      text: link.textContent?.trim(),
      href: link.getAttribute('href')
    } : null;
  });

  console.log('Phone channel detected:', phoneDetails);

  await page.screenshot({
    path: path.resolve('C:/Users/Himanshu Kaushal/.gemini/antigravity/brain/061900ed-db78-408e-97dc-d009e51625cc/contact_phone_verified.png')
  });

  await browser.close();
}

verifyContact().catch(console.error);

