export type VerificationStatus =
  | 'REFERENCE_ONLY'
  | 'LISTED'
  | 'MEASURED'
  | 'VERIFIED'
  | 'UNAVAILABLE';

export interface DataSourceItem {
  id: string;
  sourceName: string;
  url: string;
  domain: string;
  publishedDate: string | null;
  verifiedDate: string;
  verificationStatus: VerificationStatus;
  extractedFields: string[];
  notes: string;
  claimConflicts?: string;
}

export const dataSources: DataSourceItem[] = [
  {
    id: "src-help",
    sourceName: "LinkCube 官方支持与知识库站点 (参考源 A)",
    url: "https://linkcube.help/",
    domain: "linkcube.help",
    publishedDate: "2026-07-20",
    verifiedDate: "2026-10-31",
    verificationStatus: "REFERENCE_ONLY",
    extractedFields: [
      "套餐架构 (学生月付 ¥15/80GB/2设备, 白领精选 ¥28/200GB/5设备, 商务专线 ¥58/500GB/8设备)",
      "协议与客户端 (Windows, macOS, Android, iOS)",
      "线路技术提及 (BGP, IPLC, IEPL)",
      "节点地区提及 (香港, 日本, 新加坡, 美国)"
    ],
    notes: "公开文档展示了标准的三档月付梯度。未公开全量实时节点 IP 与丢包率实测原始日记，故列为 REFERENCE_ONLY 状态。",
    claimConflicts: "与 linkcube.biz 在套餐命名、资费（如入门档 ¥15 vs ¥12.8）及流量规格上存在实质差异。"
  },
  {
    id: "src-biz",
    sourceName: "LinkCube 品牌推介与专线资讯站 (参考源 B)",
    url: "https://linkcube.biz/",
    domain: "linkcube.biz",
    publishedDate: "2026-07-25",
    verifiedDate: "2026-10-31",
    verificationStatus: "REFERENCE_ONLY",
    extractedFields: [
      "套餐架构 (轻量入门 ¥12.8/180GB/3设备, 至尊全能 ¥29.8/500GB/6设备, 神话年度 ¥198/800GB/不限设备)",
      "宣传文案 (万兆 IPLC/IEPL 内网立体直射矩阵)",
      "宣称指标 (极速秒开、大模型验证解锁、零日志)"
    ],
    notes: "文案营销属性明显。宣称的低延迟、万兆专线与不限设备等缺乏第三方可复现的监测导出记录，不可作为本站实测事实。",
    claimConflicts: "与 linkcube.help 套餐体系完全不一致，不得在没有独立结算系统证明时混合为六档套餐。"
  },
  {
    id: "src-aff",
    sourceName: "灵动Aff 客户端分发与购买通道 (结算调度系统)",
    url: "https://varnexa.lingdongaff.com/#/?code=HHoxxHGa",
    domain: "varnexa.lingdongaff.com",
    publishedDate: "2026-09-26",
    verifiedDate: "2026-10-31",
    verificationStatus: "LISTED",
    extractedFields: [
      "用户注册与收银台系统接入",
      "线路测速与调度分发入口"
    ],
    notes: "为当前 LinkCube 推广体系指定的最终交付与结算页面。实际订购时以该系统结算界面的实时商品与标价为准。",
    claimConflicts: "属于第三方调度与分销层，需提示用户注意两套参考站可能并非同一直接账户库。"
  }
];
