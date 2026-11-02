import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_DIR = path.resolve('src/content/articles');

export function countChineseCharacters(text) {
  // Strip frontmatter
  const body = text.replace(/^---[\s\S]*?---/, '');
  // Match Chinese characters (Unicode range 4E00 - 9FA5)
  const matches = body.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

export function auditArticles() {
  console.log('=== 审计六篇原创文章字数与完整性 ===\n');

  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error(`错误：目录不存在 ${ARTICLES_DIR}`);
    return { passed: false, totalChars: 0, results: [] };
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const results = [];
  let totalChars = 0;
  let allPassed = true;

  const expectedSlugs = [
    'linkcube-region-evidence',
    'linkcube-entry-exit',
    'linkcube-time-series',
    'linkcube-data-quality',
    'linkcube-pricing-sources',
    'linkcube-region-updates'
  ];

  for (const slug of expectedSlugs) {
    const filename = `${slug}.md`;
    const filePath = path.join(ARTICLES_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.error(`[缺失] 文章文件未找到: ${filename}`);
      allPassed = false;
      results.push({ slug, status: 'MISSING', count: 0 });
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const count = countChineseCharacters(content);
    totalChars += count;

    // Check frontmatter
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : filename;

    // Check word count constraint: 1000 - 1800 Chinese chars
    const isCountValid = count >= 1000 && count <= 1800;
    if (!isCountValid) {
      allPassed = false;
    }

    // Check empty sections
    const hasEmptySections = /###\s+[^\n]+\n\s*(?=###|$)/.test(content);
    if (hasEmptySections) {
      allPassed = false;
      console.warn(`[警告] ${slug} 存在未填充内容的章节`);
    }

    console.log(`[${isCountValid ? 'PASS' : 'FAIL'}] ${title}`);
    console.log(`       文件: ${filename} | 汉字数: ${count} (要求 1000-1800)`);

    results.push({
      slug,
      title,
      count,
      isCountValid,
      hasEmptySections,
      status: isCountValid && !hasEmptySections ? 'PASSED' : 'FAILED'
    });
  }

  console.log('\n----------------------------------------');
  console.log(`六篇文章总汉字数: ${totalChars} (要求 6000-10800 汉字)`);
  console.log(`文章数量: ${results.filter(r => r.status === 'PASSED').length} / 6`);
  console.log(`审核结果: ${allPassed ? '全部达标 (PASSED)' : '存在未达标项 (NEEDS_FIX)'}`);
  console.log('----------------------------------------\n');

  return { passed: allPassed, totalChars, results };
}

// Run directly if invoked
if (process.argv[1]?.endsWith('audit-content.mjs')) {
  const { passed } = auditArticles();
  if (!passed) {
    process.exitCode = 1;
  }
}
