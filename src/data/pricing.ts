import { pricingSourceA, pricingSourceB, type PricingTierReference } from './pricing-sources.ts';
import { brand } from './brand.ts';

export interface PricingReconciliation {
  isResolved: boolean;
  statusText: string;
  officialCheckoutUrl: string;
  sourceACount: number;
  sourceBCount: number;
  disclaimer: string;
  sourceA: PricingTierReference[];
  sourceB: PricingTierReference[];
}

export const pricingReconciliation: PricingReconciliation = {
  isResolved: false,
  statusText: "参考源存在价格冲突（待结算后台核验）",
  officialCheckoutUrl: brand.affiliateUrl,
  sourceACount: pricingSourceA.length,
  sourceBCount: pricingSourceB.length,
  disclaimer: "由于 linkcube.help 与 linkcube.biz 所列资费、月流量及设备配额存在实质冲突，本站拒绝未经后台核验将两套体系拼凑为统一套餐。用户在通过正式分发链接进入收银台后，请以实时结算页面出具的最终方案与周期资费为准。",
  sourceA: pricingSourceA,
  sourceB: pricingSourceB
};
