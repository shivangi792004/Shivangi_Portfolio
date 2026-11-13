import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkTabFavicon() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  const requestedUrls: string[] = [];
  page.on('request', (req) => {
    if (req.url().includes('icon') || req.url().includes('manifest')) {
      requestedUrls.push(req.url());
    }
  });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  const iconHrefs = await page.$$eval('link[rel*="icon"]', (els) =>
    els.map((e) => ({ rel: e.rel, href: e.href, type: e.type }))
  );

  console.log('Icon tags in HTML:', iconHrefs);
  console.log('Icon requests made by browser:', requestedUrls);

  await browser.close();
}

checkTabFavicon().catch(console.error);

