import { spawn } from 'child_process';
import http from 'http';

function waitForServer(url: string, timeout = 10000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else setTimeout(check, 200);
        })
        .on('error', () => {
          if (Date.now() - start > timeout) {
            reject(new Error('Server start timeout'));
          } else {
            setTimeout(check, 200);
          }
        });
    };
    check();
  });
}

async function main() {
  console.log('Starting preview server...');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--host'], {
    shell: true,
    stdio: 'ignore',
  });

  try {
    await waitForServer('http://localhost:4173');
    console.log('Preview server ready. Running Lighthouse audit...');

    await new Promise<void>((resolve, reject) => {
      const lh = spawn(
        'npx',
        [
          'lighthouse',
          'http://localhost:4173',
          '--chrome-flags="--headless --no-sandbox --disable-gpu"',
          '--output=json',
          '--output-path=./lighthouse-results-gaps-filled.json',
          '--only-categories=performance,accessibility,best-practices,seo',
          '--quiet',
        ],
        { shell: true, stdio: 'inherit' }
      );
      lh.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Lighthouse exited with code ${code}`));
      });
    });

    const results = require('./lighthouse-results-gaps-filled.json');
    const scores = {
      performance: Math.round(results.categories.performance.score * 100),
      accessibility: Math.round(results.categories.accessibility.score * 100),
      bestPractices: Math.round(results.categories['best-practices'].score * 100),
      seo: Math.round(results.categories.seo.score * 100),
    };
    console.log('\n📊 Final Lighthouse Scores with All Gaps Filled:');
    console.log(JSON.stringify(scores, null, 2));
  } finally {
    preview.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

