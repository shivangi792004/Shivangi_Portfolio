import { links } from '../src/data/links';

interface LinkStatus {
  key: string;
  url: string | null;
  status: 'NULL' | 'VALID' | 'BROKEN' | 'LOCAL';
  httpStatus?: number;
  message?: string;
}

async function checkLink(key: string, url: string | null): Promise<LinkStatus> {
  if (!url) {
    return { key, url, status: 'NULL', message: 'Configured as null (UI safely hides corresponding element)' };
  }

  if (url.startsWith('/') || url.startsWith('mailto:')) {
    return { key, url, status: 'LOCAL', message: 'Local asset or mailto protocol' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    // Some servers return 405 Method Not Allowed or 403 on HEAD, retry with GET
    if (response.status === 405 || response.status === 403) {
      const getRes = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      if (getRes.status < 400 || getRes.status === 403 || getRes.status === 999) {
        // LinkedIn / LeetCode often return 999 or 403 to automated scripts without auth
        return { key, url, status: 'VALID', httpStatus: getRes.status, message: 'Reachable (Bot challenge handled)' };
      }
      return { key, url, status: 'BROKEN', httpStatus: getRes.status, message: `HTTP status ${getRes.status}` };
    }

    if (response.status < 400 || response.status === 999) {
      return { key, url, status: 'VALID', httpStatus: response.status, message: 'Reachable' };
    }

    return { key, url, status: 'BROKEN', httpStatus: response.status, message: `HTTP status ${response.status}` };
  } catch (error: any) {
    return {
      key,
      url,
      status: 'BROKEN',
      message: error?.message || 'Network unreachable',
    };
  }
}

async function main() {
  console.log('\n=========================================');
  console.log('🔗 Link Registry Audit (src/data/links.ts)');
  console.log('=========================================\n');

  const keys = Object.keys(links);
  const results: LinkStatus[] = [];

  for (const key of keys) {
    const res = await checkLink(key, links[key]);
    results.push(res);
  }

  const nullLinks = results.filter((r) => r.status === 'NULL');
  const validLinks = results.filter((r) => r.status === 'VALID' || r.status === 'LOCAL');
  const brokenLinks = results.filter((r) => r.status === 'BROKEN');

  console.log('✅ ACTIVE / VERIFIED LINKS:');
  validLinks.forEach((l) => {
    console.log(`  [${l.status}] ${l.key} -> ${l.url} (${l.message})`);
  });

  console.log('\n⚠️ NULL / PENDING LINKS (UI conditionally hidden):');
  nullLinks.forEach((l) => {
    console.log(`  [NULL] ${l.key}`);
  });

  if (brokenLinks.length > 0) {
    console.log('\n❌ BROKEN LINKS:');
    brokenLinks.forEach((l) => {
      console.log(`  [BROKEN] ${l.key} -> ${l.url} (${l.message})`);
    });
  } else {
    console.log('\n🎉 No broken active URLs detected.');
  }

  console.log(`\nSummary: ${validLinks.length} active, ${nullLinks.length} pending/null, ${brokenLinks.length} broken.\n`);
}

main();

