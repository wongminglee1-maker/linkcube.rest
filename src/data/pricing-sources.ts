export interface PricingTierReference {
  id: string;
  sourceKey: 'linkcube.help' | 'linkcube.biz';
  sourceName: string;
  sourceUrl: string;
  tierName: string;
  price: string;
  period: string;
  traffic: string;
  devices: string;
  features: string[];
  conflictNotes: string;
  status: 'REFERENCE_CONFLICT';
}

export const pricingSourceA: PricingTierReference[] = [
  {
    id: "help-student",
    sourceKey: "linkcube.help",
    sourceName: "linkcube.help (公开参考站 A)",
    sourceUrl: "https://linkcube.help/",
    tierName: "学生月付",
    price: "¥15",
    period: "按月结算",
    traffic: "80 GB / 月",
    devices: "2 台设备同时在线",
    features: ["基础跨区专线通道", "全平台协议支持", "工单客服支持"],
    conflictNotes: "相较于 biz 站，其入门价格高出 ¥2.2，但流量少了 100GB，设备限制更严格。",
    status: "REFERENCE_CONFLICT"
  },
  {
    id: "help-whitecollar",
    sourceKey: "linkcube.help",
    sourceName: "linkcube.help (公开参考站 A)",
    sourceUrl: "https://linkcube.help/",
    tierName: "白领精选",
    price: "¥28",
    period: "按月结算",
    traffic: "200 GB / 月",
    devices: "5 台设备同时在线",
    features: ["高优先级中转专线", "流媒体与大模型适配", "多设备协同访问"],
    conflictNotes: "¥28 对应 200GB，而 biz 站同价位 ¥29.8 标称 500GB，规格差异达 2.5 倍。",
    status: "REFERENCE_CONFLICT"
  },
  {
    id: "help-business",
    sourceKey: "linkcube.help",
    sourceName: "linkcube.help (公开参考站 A)",
    sourceUrl: "https://linkcube.help/",
    tierName: "商务专线",
    price: "¥58",
    period: "按月结算",
    traffic: "500 GB / 月",
    devices: "最多 8 台设备",
    features: ["企业级极速互联通道", "专享突发带宽资源", "SLA 优先响应支持"],
    conflictNotes: "500GB 在 help 站标价 ¥58，而在 biz 站仅需 ¥29.8。两站数据模型未对齐。",
    status: "REFERENCE_CONFLICT"
  }
];

export const pricingSourceB: PricingTierReference[] = [
  {
    id: "biz-starter",
    sourceKey: "linkcube.biz",
    sourceName: "linkcube.biz (公开参考站 B)",
    sourceUrl: "https://linkcube.biz/",
    tierName: "轻量畅快入门版",
    price: "¥12.8",
    period: "按月结算",
    traffic: "180 GB / 月",
    devices: "3 台设备同时在线",
    features: ["基础 IPLC 专线路由", "大模型 IP 穿刺", "网页秒开优化"],
    conflictNotes: "属于高配低价模式，与 help 站的 ¥15/80GB 产生明显定价冲突。",
    status: "REFERENCE_CONFLICT"
  },
  {
    id: "biz-extreme",
    sourceKey: "linkcube.biz",
    sourceName: "linkcube.biz (公开参考站 B)",
    sourceUrl: "https://linkcube.biz/",
    tierName: "绝区至尊全能版",
    price: "¥29.8",
    period: "按月结算",
    traffic: "500 GB / 月",
    devices: "6 台设备同时在线",
    features: ["万兆内网矩阵直达", "流媒体 4K 极速秒冲", "全时段优先通道"],
    conflictNotes: "流量额度大幅高于 help 站同价位档次，疑似不同运营批次或独立分销站。",
    status: "REFERENCE_CONFLICT"
  },
  {
    id: "biz-mythic",
    sourceKey: "linkcube.biz",
    sourceName: "linkcube.biz (公开参考站 B)",
    sourceUrl: "https://linkcube.biz/",
    tierName: "神话年度无阻版",
    price: "¥198",
    period: "按年结算",
    traffic: "800 GB / 月",
    devices: "页面声称不限设备",
    features: ["全节点不限速特权", "独享 VIP 国际专线", "超长年度订阅折扣"],
    conflictNotes: "help 站未公开年付此档规格，“不限设备”亦缺乏风控和技术实现说明。",
    status: "REFERENCE_CONFLICT"
  }
];
