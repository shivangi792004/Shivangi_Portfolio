import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_PATH = path.resolve('public/og-image.png');

async function generateOgImage() {
  const tempDir = path.resolve('.chrome-profile-og');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    userDataDir: tempDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 630px;
            background: #09090B;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 64px 80px;
            position: relative;
            overflow: hidden;
          }
          .glow-1 {
            position: absolute;
            top: -120px;
            right: -80px;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(79, 70, 229, 0.28) 0%, rgba(79, 70, 229, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }
          .glow-2 {
            position: absolute;
            bottom: -150px;
            left: -100px;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 10;
          }
          .logo {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: linear-gradient(135deg, #4F46E5, #7C3AED);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 900;
            color: #FFFFFF;
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
            border: 1px solid rgba(165, 180, 252, 0.3);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 9999px;
            background: rgba(79, 70, 229, 0.15);
            border: 1px solid rgba(99, 102, 241, 0.4);
            color: #A5B4FC;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .pulse {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10B981;
            box-shadow: 0 0 10px #10B981;
          }
          .main {
            z-index: 10;
            margin: auto 0;
          }
          h1 {
            font-size: 64px;
            font-weight: 800;
            letter-spacing: -1.5px;
            line-height: 1.1;
            margin-bottom: 16px;
            background: linear-gradient(180deg, #FFFFFF 0%, #E4E4E7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .subtitle {
            font-size: 26px;
            color: #A1A1AA;
            font-weight: 500;
            line-height: 1.4;
            max-width: 900px;
          }
          .highlight {
            color: #818CF8;
            font-weight: 600;
          }
          .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 10;
          }
          .tags {
            display: flex;
            gap: 10px;
          }
          .tag {
            padding: 8px 14px;
            border-radius: 8px;
            background: #18181B;
            border: 1px solid #27272A;
            font-size: 14px;
            color: #D4D4D8;
            font-weight: 600;
          }
          .url {
            font-size: 16px;
            font-weight: 600;
            color: #71717A;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        
        <div class="header">
          <div class="logo">S</div>
          <div class="badge">
            <span class="pulse"></span>
            Frontend Developer Intern @ Triwize
          </div>
        </div>

        <div class="main">
          <h1>Shivangi Singh</h1>
          <p class="subtitle">
            Frontend & Full-Stack Developer specializing in <span class="highlight">React.js, TypeScript, & MERN Stack</span>. 300+ DSA Problems Solved & Production Web Architectures.
          </p>
        </div>

        <div class="footer">
          <div class="tags">
            <span class="tag">React 18</span>
            <span class="tag">TypeScript</span>
            <span class="tag">Tailwind CSS</span>
            <span class="tag">Node.js</span>
            <span class="tag">MongoDB</span>
            <span class="tag">REST APIs</span>
          </div>
          <span class="url">shivangi-portfolio-virid.vercel.app</span>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.screenshot({ path: OUTPUT_PATH, type: 'png' });
  await browser.close();

  // Also copy to dist if dist exists
  if (fs.existsSync('dist')) {
    fs.copyFileSync(OUTPUT_PATH, path.resolve('dist/og-image.png'));
  }

  console.log('Successfully generated public/og-image.png (1200x630)');
}

generateOgImage().catch(console.error);
