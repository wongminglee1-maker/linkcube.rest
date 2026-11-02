import fs from 'node:fs';
import path from 'node:path';

/**
 * IndexNow API Submitter for linkcube.rest
 * Supported search engines: Bing, Yandex, IndexNow.org
 */

const HOST = 'linkcube.rest';
const KEY = process.env.INDEXNOW_KEY || 'c4b8e217a94f48b896dc40994f861b58';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// List of official canonical URLs to submit
const OFFICIAL_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/regions/`,
  `https://${HOST}/pricing/`,
  `https://${HOST}/data-methodology/`,
  `https://${HOST}/guides/`,
  `https://${HOST}/guides/linkcube-region-evidence/`,
  `https://${HOST}/guides/linkcube-entry-exit/`,
  `https://${HOST}/guides/linkcube-time-series/`,
  `https://${HOST}/guides/linkcube-data-quality/`,
  `https://${HOST}/guides/linkcube-pricing-sources/`,
  `https://${HOST}/guides/linkcube-region-updates/`,
  `https://${HOST}/about/`,
  `https://${HOST}/privacy/`,
  `https://${HOST}/terms/`
];

export async function submitIndexNow(options = {}) {
  console.log('=== IndexNow 搜索引擎即时推送系统 (scripts/submit-indexnow.mjs) ===\n');
  console.log(`主机域名: ${HOST}`);
  console.log(`IndexNow Key: ${KEY.slice(0, 8)}***`);
  console.log(`Key 验证位置: ${KEY_LOCATION}\n`);

  // 1. Ensure verification txt file exists in public/
  const verificationFilePath = path.resolve(`public/${KEY}.txt`);
  if (!fs.existsSync(verificationFilePath)) {
    fs.writeFileSync(verificationFilePath, KEY, 'utf8');
    console.log(`[PASS] 自动在 public/ 生成 IndexNow 密钥验证文件: ${KEY}.txt`);
  }

  // 2. Read submission cache to prevent redundant submissions
  const cachePath = path.resolve('public/data/indexnow-cache.json');
  let cache = { submitted: {}, lastRun: null };
  if (fs.existsSync(cachePath)) {
    try {
      cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    } catch (e) {
      // ignore
    }
  }

  const urlsToSubmit = OFFICIAL_URLS.filter(url => {
    if (options.force) return true;
    return !cache.submitted[url];
  });

  if (urlsToSubmit.length === 0) {
    console.log('[INFO] 所有页面近期已提交过且无变更，无需重复推送。');
    return { success: true, count: 0 };
  }

  console.log(`准备提交 ${urlsToSubmit.length} 个正式页面至 IndexNow 接口：`);
  urlsToSubmit.forEach(u => console.log(` - ${u}`));

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlsToSubmit
  };

  const endpoints = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/IndexNow'
  ];

  let anySuccess = false;

  for (const endpoint of endpoints) {
    try {
      console.log(`\n正在向 ${endpoint} 发送推送请求...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`响应状态码: HTTP ${res.status} (${res.statusText})`);

      if (res.status === 200 || res.status === 202) {
        console.log(`[PASS] 接口已成功接收 URL 列表（状态码 ${res.status}）。`);
        console.log('重要提示：IndexNow 接收状态仅代表搜索引擎已将请求排入抓取队列，不代表已完成抓取或已被搜索引擎正式收录。');
        anySuccess = true;
      } else {
        const text = await res.text();
        console.warn(`[WARN] 接口返回非成功状态: ${res.status} - ${text}`);
      }
    } catch (err) {
      console.error(`[ERROR] 连接 ${endpoint} 失败: ${err.message}`);
    }
  }

  // Update submission cache
  if (anySuccess || options.dryRun) {
    const now = new Date().toISOString();
    urlsToSubmit.forEach(url => {
      cache.submitted[url] = now;
    });
    cache.lastRun = now;
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`\n[PASS] 已更新提交缓存记录: ${cachePath}`);
  }

  return { success: anySuccess, count: urlsToSubmit.length };
}

if (process.argv[1]?.endsWith('submit-indexnow.mjs')) {
  submitIndexNow().catch(err => {
    console.error('IndexNow 运行失败:', err);
    process.exitCode = 1;
  });
}
