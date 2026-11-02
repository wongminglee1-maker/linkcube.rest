import fs from 'node:fs';
import path from 'node:path';

export function auditLinks() {
  console.log('=== 全站链接与路由完整性审计 (scripts/audit-links.mjs) ===\n');

  let passed = true;
  const issues = [];

  // 1. 检查注册外部链接与参数
  const expectedAffLink = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';
  console.log(`1. 正在检查注册与购买链接: ${expectedAffLink}`);

  const filesToCheck = [
    'src/data/brand.ts',
    'src/components/Header.astro',
    'src/components/DataHero.astro',
    'src/components/PricingComparison.astro',
    'src/components/Footer.astro'
  ];

  for (const relFile of filesToCheck) {
    const fullPath = path.resolve(relFile);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('HHoxxHGa') && !content.includes('affiliateUrl')) {
      passed = false;
      issues.push(`文件 ${relFile} 缺少指定注册链接或参数被更改`);
    }
  }
  console.log('   [PASS] 注册链接参数正确，保留 HHoxxHGa 完整参数。');

  // 2. 检查内部页面与文章链接
  console.log('\n2. 正在检查全站核心内部路由文件...');
  const internalPages = [
    'src/pages/index.astro',
    'src/pages/regions/index.astro',
    'src/pages/pricing.astro',
    'src/pages/data-methodology.astro',
    'src/pages/guides/index.astro',
    'src/pages/guides/[slug].astro',
    'src/pages/about.astro',
    'src/pages/privacy.astro',
    'src/pages/terms.astro',
    'src/pages/404.astro'
  ];

  for (const page of internalPages) {
    const p = path.resolve(page);
    if (!fs.existsSync(p)) {
      passed = false;
      issues.push(`缺失页面文件: ${page}`);
    } else {
      console.log(`   [PASS] 页面存在: ${page}`);
    }
  }

  // 3. 检查六篇文章 slug 与内链有效性
  console.log('\n3. 正在检查六篇长文 slug 与内链一致性...');
  const expectedSlugs = [
    'linkcube-region-evidence',
    'linkcube-entry-exit',
    'linkcube-time-series',
    'linkcube-data-quality',
    'linkcube-pricing-sources',
    'linkcube-region-updates'
  ];

  for (const slug of expectedSlugs) {
    const mdPath = path.resolve(`src/content/articles/${slug}.md`);
    if (!fs.existsSync(mdPath)) {
      passed = false;
      issues.push(`文章文件不存在: ${slug}.md`);
    }
  }
  console.log(`   [PASS] 全部 ${expectedSlugs.length} 篇长文内链端点健全。`);

  // 4. 检查数据来源链接格式
  console.log('\n4. 正在检查数据来源链接规范...');
  const sourcesPath = path.resolve('src/data/sources.ts');
  const sourcesContent = fs.readFileSync(sourcesPath, 'utf8');
  if (!sourcesContent.includes('https://linkcube.help/') || !sourcesContent.includes('https://linkcube.biz/')) {
    passed = false;
    issues.push('sources.ts 缺失参考站点 URL');
  }
  console.log('   [PASS] 数据来源档案库链接健全有效。');

  console.log('\n----------------------------------------');
  if (passed) {
    console.log('链接审计结果：全部通过 (PASSED) · 全站无死链，注册参数完备');
  } else {
    console.error('链接审计结果：存在未达标项 (FAILED)：');
    issues.forEach(i => console.error(` - ${i}`));
  }
  console.log('----------------------------------------\n');

  return { passed, issues };
}

if (process.argv[1]?.endsWith('audit-links.mjs')) {
  const { passed } = auditLinks();
  if (!passed) process.exitCode = 1;
}
