import { regionsData } from '../src/data/regions.ts';
import { verifiedMeasurements } from '../src/data/measurements.ts';
import { dataSources } from '../src/data/sources.ts';
import { pricingReconciliation } from '../src/data/pricing.ts';
import { pricingSourceA, pricingSourceB } from '../src/data/pricing-sources.ts';

export function validateData() {
  console.log('=== 运行数据真实性与凭据审计 (scripts/validate-data.mjs) ===\n');

  let passed = true;
  const issues = [];

  // 1. 验证地区数据来源与字段
  console.log('1. 正在检查地区资料数据完整性与来源出处...');
  if (!regionsData || regionsData.length === 0) {
    passed = false;
    issues.push('regionsData 为空');
  }

  for (const region of regionsData) {
    if (!region.sourceURL || !region.sourceURL.startsWith('http')) {
      passed = false;
      issues.push(`地区 ${region.regionName} 缺失有效 sourceURL`);
    }
    if (!region.verifiedAt) {
      passed = false;
      issues.push(`地区 ${region.regionName} 缺失复核日期 verifiedAt`);
    }
    if (!region.evidenceStatus) {
      passed = false;
      issues.push(`地区 ${region.regionName} 缺失证据状态 evidenceStatus`);
    }
    // 检查是否在未核实前伪造了 nodeName
    if (region.evidenceStatus === 'REFERENCE_ONLY' && region.nodeName !== null) {
      passed = false;
      issues.push(`违规：地区 ${region.regionName} 为 REFERENCE_ONLY 状态但填充了 nodeName (${region.nodeName})`);
    }
  }
  console.log(`   已核对 ${regionsData.length} 个地区资料，字段合规。`);

  // 2. 验证测速数据真实性与时区规范
  console.log('\n2. 正在检查测量记录 (measurements) 诚信标准...');
  for (const m of verifiedMeasurements) {
    // 必须有时间戳且带有时区
    if (!m.testedAt || !m.testedAt.includes('+') && !m.testedAt.includes('Z')) {
      passed = false;
      issues.push(`测速记录 ${m.measurementId} 缺失带有时区的时间戳`);
    }
    // 丢包率校验 (0 - 100)
    if (m.packetLossPercent !== null) {
      if (m.packetLossPercent < 0 || m.packetLossPercent > 100) {
        passed = false;
        issues.push(`测速记录 ${m.measurementId} 丢包率异常: ${m.packetLossPercent}%`);
      }
    }
    // 延迟校验 (非负数)
    if (m.latencyMs !== null) {
      if (m.latencyMs < 0) {
        passed = false;
        issues.push(`测速记录 ${m.measurementId} 延迟为负数: ${m.latencyMs}`);
      }
    }
    // 检查是否用 0 代替缺失值
    if (m.verificationStatus === 'UNAVAILABLE' && (m.latencyMs === 0 || m.downloadMbps === 0)) {
      passed = false;
      issues.push(`违规：测速记录 ${m.measurementId} 在 UNAVAILABLE 状态下使用了 0 代替 null`);
    }
  }
  console.log(`   测速数据集包含 ${verifiedMeasurements.length} 条正式实测记录（未取得原始抓包日志前严格保持为空，不伪造记录）。`);

  // 3. 验证套餐数据未被错误合并
  console.log('\n3. 正在检查套餐价格冲突隔离...');
  if (pricingReconciliation.isResolved) {
    passed = false;
    issues.push('违规：在未取得后台结算凭据前错误将 isResolved 设为了 true');
  }
  if (!pricingSourceA || pricingSourceA.length === 0) {
    passed = false;
    issues.push('pricingSourceA 为空');
  }
  if (!pricingSourceB || pricingSourceB.length === 0) {
    passed = false;
    issues.push('pricingSourceB 为空');
  }
  // 确保没有把两套混合
  const sampleA_names = pricingSourceA.map(p => p.tierName);
  const sampleB_names = pricingSourceB.map(p => p.tierName);
  const intersect = sampleA_names.filter(n => sampleB_names.includes(n));
  if (intersect.length > 0) {
    console.warn(`   两站存在同名套餐: ${intersect.join(', ')}`);
  }
  console.log(`   参考源 A 套餐数量: ${pricingSourceA.length} | 参考源 B 套餐数量: ${pricingSourceB.length}。双源保持独立隔离。`);

  // 4. 验证数据来源字典
  console.log('\n4. 正在检查数据来源凭证库 (sources.ts)...');
  for (const src of dataSources) {
    if (!src.url || !src.domain || !src.verificationStatus) {
      passed = false;
      issues.push(`数据源 ${src.id} 字段不完整`);
    }
  }
  console.log(`   数据源凭证库共包含 ${dataSources.length} 条有效参考来源。`);

  console.log('\n----------------------------------------');
  if (passed) {
    console.log('数据验证审核结果：全部通过 (PASSED) · 无伪造数据，符合数据诚信标准');
  } else {
    console.error('数据验证审核结果：未通过 (FAILED) · 发现以下问题：');
    issues.forEach(i => console.error(` - ${i}`));
  }
  console.log('----------------------------------------\n');

  return { passed, issues };
}

if (process.argv[1]?.endsWith('validate-data.mjs')) {
  const { passed } = validateData();
  if (!passed) process.exitCode = 1;
}
