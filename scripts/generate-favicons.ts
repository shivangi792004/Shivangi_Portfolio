import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PUBLIC_DIR = path.resolve('public');

// Vector SVG Favicon with high-contrast electric gradient & crisp geometric 'S'
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-opacity="0.25" flood-color="#000" />
    </filter>
  </defs>
  
  <!-- Outer Rounded Squircle -->
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#09090B" />
  <rect x="3" y="3" width="58" height="58" rx="15" fill="url(#primaryGrad)" />
  
  <!-- Inner Highlight Border -->
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" fill="none" stroke="#A5B4FC" stroke-width="1.2" stroke-opacity="0.35" />

  <!-- Distinctive Brand 'S' Monogram -->
  <text 
    x="32" 
    y="36" 
    text-anchor="middle" 
    dominant-baseline="central" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
    font-weight="900" 
    font-size="36" 
    fill="#FFFFFF"
    filter="url(#subtleShadow)"
    letter-spacing="-1"
  >S</text>
</svg>
`;

const webManifest = {
  name: 'Shivangi Singh — Portfolio',
  short_name: 'Shivangi Singh',
  description: 'Frontend Developer & Full-Stack Developer Portfolio',
  start_url: '/',
  display: 'standalone',
  background_color: '#09090B',
  theme_color: '#09090B',
  icons: [
    {
      src: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png'
    },
    {
      src: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png'
    },
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml'
    }
  ]
};

async function generateFavicons() {
  console.log('🎨 Generating Favicon Suite...');
  
  // 1. Write SVG Favicon
  const svgPath = path.join(PUBLIC_DIR, 'favicon.svg');
  fs.writeFileSync(svgPath, svgFavicon.trim(), 'utf8');
  console.log('✅ Generated public/favicon.svg');

  // 2. Write Web Manifest
  const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
  fs.writeFileSync(manifestPath, JSON.stringify(webManifest, null, 2), 'utf8');
  console.log('✅ Generated public/site.webmanifest');

  // 3. Render PNG sizes using Headless Chrome
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // High-res HTML wrapper for SVG
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 100vw; height: 100vh; overflow: hidden; }
          svg { width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>
        ${svgFavicon}
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'load' });

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.png', size: 64 },
  ];

  for (const { name, size } of sizes) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    const outPath = path.join(PUBLIC_DIR, name);
    await page.screenshot({
      path: outPath,
      omitBackground: true,
      clip: { x: 0, y: 0, width: size, height: size }
    });
    console.log(`✅ Generated public/${name} (${size}x${size})`);
  }

  // Also create favicon.ico as a copy of the 32x32 PNG for maximum compatibility
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  fs.copyFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), icoPath);
  console.log('✅ Generated public/favicon.ico');

  await browser.close();
  console.log('\n✨ Favicon Suite successfully compiled!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});

