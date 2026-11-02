export interface BrandInfo {
  name: string;
  chineseName: string;
  domain: string;
  canonicalUrl: string;
  language: string;
  affiliateUrl: string;
  tagline: string;
  subTagline: string;
  metaDescription: string;
  establishedRef: string;
}

export const brand: BrandInfo = {
  name: "LinkCube",
  chineseName: "绿叶 LinkCube",
  domain: "linkcube.rest",
  canonicalUrl: "https://linkcube.rest",
  language: "zh-CN",
  affiliateUrl: "https://varnexa.lingdongaff.com/#/?code=HHoxxHGa",
  tagline: "LinkCube｜看懂节点地区，让数据说明连接",
  subTagline: "从地区信息、线路概念到网络测试记录，了解影响连接体验的不同因素。通过清晰的图表和资料来源，帮助用户做出更有依据的选择。",
  metaDescription: "了解 LinkCube 机场公开的节点地区、线路概念与套餐信息，查看香港、日本、新加坡、美国节点资料，以及延迟、丢包、分时段数据和网络测试方法。",
  establishedRef: "2026",
};

export const brandFeatures = [
  {
    id: "transparency",
    title: "地区资料透明",
    description: "清晰区分公开参考文章提及地区与实测确认节点，坚决杜绝无依据虚标节点清单与无源宣传数据。",
    tag: "资料核查"
  },
  {
    id: "routing-knowledge",
    title: "清晰的线路知识",
    description: "详尽解析 BGP、IPLC、IEPL、中转与直连的技术原理，阐明物理距离、路由跳数与真实延迟的逻辑关系。",
    tag: "网络原理"
  },
  {
    id: "traceable-metrics",
    title: "可追溯的数据说明",
    description: "所有测速指标均保留时间戳、时区、测试环境与来源标记，缺失指标如实标空，提供高可读性表格视图。",
    tag: "数据质量"
  }
];
