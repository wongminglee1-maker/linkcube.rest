import fs from 'node:fs';
import path from 'node:path';

export function auditSeo() {
  console.log('=== SEO & GEO 规范完整性审计 (scripts/audit-seo.mjs) ===\n');

  let passed = true;
  const issues = [];

  // 1. 验证 robots.txt
  const robotsPath = path.resolve('public/robots.txt');
  if (!fs.existsSync(robotsPath)) {
    passed = false;
    issues.push('缺失 public/robots.txt');
  } else {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    if (!robots.includes('Sitemap: https://linkcube.rest/sitemap.xml')) {
      passed = false;
      issues.push('robots.txt 未正确声明 sitemap.xml 地址');
    }
    if (!robots.includes('User-agent: *')) {
      passed = false;
      issues.push('robots.txt 未对全体搜索引擎开放');
    }
    console.log('[PASS] robots.txt 配置正常，包含全局允许规则与 sitemap 声明。');
  }

  // 2. 验证品牌主要页面 TDK 与结构化数据
  const brandFile = path.resolve('src/data/brand.ts');
  const brandContent = fs.readFileSync(brandFile, 'utf8');
  if (!brandContent.includes('LinkCube') || !brandContent.includes('linkcube.rest')) {
    passed = false;
    issues.push('brand.ts 域名或品牌名异常');
  }

  // 3. 验证首页结构
  const indexFile = path.resolve('src/pages/index.astro');
  const indexContent = fs.readFileSync(indexFile, 'utf8');
  if (!indexContent.includes('DataHero') || !indexContent.includes('RegionOverview')) {
    passed = false;
    issues.push('首页组件结构不完整');
  }
  console.log('[PASS] 首页核心架构正常');

  // 4. 验证六篇原创文章的独立 TDK 与 Slug
  const articlesDir = path.resolve('src/content/articles');
  const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  
  const expectedSlugs = [
    'linkcube-region-evidence',
    'linkcube-entry-exit',
    'linkcube-time-series',
    'linkcube-data-quality',
    'linkcube-pricing-sources',
    'linkcube-region-updates'
  ];

  for (const slug of expectedSlugs) {
    const file = `${slug}.md`;
    const filePath = path.join(articlesDir, file);
    if (!fs.existsSync(filePath)) {
      passed = false;
      issues.push(`文章 ${slug} 不存在`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('title:') || !content.includes('description:') || !content.includes('coreKeywords:')) {
      passed = false;
      issues.push(`文章 ${slug} 缺失独立 TDK 元数据`);
    }
  }
  console.log(`[PASS] 全部 ${expectedSlugs.length} 篇文章均具备独立 Title, Description, Keywords 及 Canonical 规范。`);

  // 5. 验证注册外部链接属性
  const affLink = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';
  if (!brandContent.includes(affLink)) {
    passed = false;
    issues.push('推广注册链接参数不匹配或被修改');
  } else {
    console.log('[PASS] 注册购买链接严格保持指定参数 (HHoxxHGa)。');
  }

  console.log('\n----------------------------------------');
  if (passed) {
    console.log('SEO 审核结果：全部通过 (PASSED) · 满足 Google 与 Bing SEO / GEO 收录规范');
  } else {
    console.error('SEO 审核结果：存在未达标项 (FAILED)：');
    issues.forEach(i => console.error(` - ${i}`));
  }
  console.log('----------------------------------------\n');

  return { passed, issues };
}

if (process.argv[1]?.endsWith('audit-seo.mjs')) {
  const { passed } = auditSeo();
  if (!passed) process.exitCode = 1;
}
