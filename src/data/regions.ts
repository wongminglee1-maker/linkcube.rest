import type { VerificationStatus } from './sources.ts';

export interface RegionEvidence {
  id: string;
  orderNumber: string;
  regionName: string;
  englishName: string;
  countryCode: string;
  city: string | null;
  sourceURL: string;
  sourceDate: string;
  verifiedAt: string;
  evidenceStatus: VerificationStatus;
  nodeName: string | null;
  entryRegion: string | null;
  exitRegion: string | null;
  lineType: string | null;
  supportedProtocols: string[] | null;
  notes: string;
  scenarioDescription: string;
  networkPrinciple: string;
  missingFields: string[];
}

export const regionsData: RegionEvidence[] = [
  {
    id: "hong-kong",
    orderNumber: "01",
    regionName: "中国香港",
    englishName: "Hong Kong",
    countryCode: "HK",
    city: "Hong Kong",
    sourceURL: "https://linkcube.help/",
    sourceDate: "2026-07-20",
    verifiedAt: "2026-10-31",
    evidenceStatus: "REFERENCE_ONLY",
    nodeName: null, // 未取得官方实时节点清单前保留 null
    entryRegion: null,
    exitRegion: "HK",
    lineType: null, // 仅公开文章提 IPLC/BGP，具体节点未核实
    supportedProtocols: null,
    scenarioDescription: "东亚地区极具代表性的网络枢纽。适合大中华区跨国协同办公、跨境代码拉取、低延迟 API 调用以及常规网页访问。",
    networkPrinciple: "地理直线距离仅代表理论光纤传播下限（约 5ms/1000km 单程），实际端到端延迟取决于本地宽带接入、城域网汇聚跳数、运营商跨网互联策略以及入口中转节点选路，较近地理位置并不必然保证物理直达的超低延迟。",
    notes: "公开参考资料提及具备香港出口节点。目前未取得 LinkCube 实时生效的独立服务器 IP 与真实测试记录，处于 REFERENCE_ONLY 状态。",
    missingFields: [
      "具体节点命名与集群编号",
      "入口落地服务器 IP / BGP 接入点",
      "端到端实测抖动 (Jitter) 与丢包率",
      "峰值带宽上限与流量统计口径"
    ]
  },
  {
    id: "japan",
    orderNumber: "02",
    regionName: "日本东京",
    englishName: "Tokyo, Japan",
    countryCode: "JP",
    city: "Tokyo",
    sourceURL: "https://linkcube.help/",
    sourceDate: "2026-07-20",
    verifiedAt: "2026-10-31",
    evidenceStatus: "REFERENCE_ONLY",
    nodeName: null,
    entryRegion: null,
    exitRegion: "JP",
    lineType: null,
    supportedProtocols: null,
    scenarioDescription: "东北亚核心骨干节点。常用于国际云服务（AWS ap-northeast-1、GCP asia-northeast1）交互、日本本土媒体访问、二次元社群及全球化游戏加速服务。",
    networkPrinciple: "必须清晰区分中转入口、骨干内网穿梭与最终出口路由。用户客户端连接的可能是国内中转入口，而目标服务器识别到的则是日本本土原生或广播 IP。二者并非同义词，DNS 解析归属地亦需与出口网络相互匹配。",
    notes: "参考文档中将日本列为主要节点选项。尚未取得带有时间戳与测试环境的真实测速导出日志，严格标记为 REFERENCE_ONLY。",
    missingFields: [
      "落地服务商 (ISP/IDC) 真实归属",
      "IPv4/IPv6 双栈支持状况",
      "国际海底光缆跳数记录",
      "全天候连续丢包率原始采样"
    ]
  },
  {
    id: "singapore",
    orderNumber: "03",
    regionName: "新加坡",
    englishName: "Singapore",
    countryCode: "SG",
    city: "Singapore",
    sourceURL: "https://linkcube.help/",
    sourceDate: "2026-07-20",
    verifiedAt: "2026-10-31",
    evidenceStatus: "REFERENCE_ONLY",
    nodeName: null,
    entryRegion: null,
    exitRegion: "SG",
    lineType: null,
    supportedProtocols: null,
    scenarioDescription: "东南亚科技核心中枢。适用于东南亚出海业务运维、Shopee/Lazada 等电商平台运营、海外金融合规交互及亚太地区跨云通信。",
    networkPrinciple: "从中国大陆至东南亚的网络路由常受海缆故障与多跳转发影响。专线（IPLC/IEPL）相比直连能够避开公网拥堵，但实际效果极大受制于入口节点到骨干网边缘的接入质量。",
    notes: "新加坡被公开资料标注为重点亚太中继，因缺乏真实测速日志与可复现的网络跟踪路由（traceroute），当前保持 REFERENCE_ONLY 状态。",
    missingFields: [
      "入口城际网络运营商属性",
      "出口 ASN 编号及广播信息",
      "丢包与晚高峰抖动历史均值",
      "流媒体与大模型地区识别实测验证"
    ]
  },
  {
    id: "united-states",
    orderNumber: "04",
    regionName: "美国西海岸",
    englishName: "US West Coast",
    countryCode: "US",
    city: "San Jose / Los Angeles",
    sourceURL: "https://linkcube.help/",
    sourceDate: "2026-07-20",
    verifiedAt: "2026-10-31",
    evidenceStatus: "REFERENCE_ONLY",
    nodeName: null,
    entryRegion: null,
    exitRegion: "US",
    lineType: null,
    supportedProtocols: null,
    scenarioDescription: "北美互联网发源地与 AI 模型大本营。适合访问 OpenAI、Anthropic、GitHub、全球开源镜像库及跨太平洋大型企业协同软件。",
    networkPrinciple: "太平洋横跨光纤往返时延（RTT）由于物理光速与折射率限制，理论往返光延通常在 120ms~160ms 以上。若有服务声称美西延迟低于 80ms，往往是将中转入口到国内边缘的单程 Ping 值与真实美西出口混淆。",
    notes: "两处参考站均将美国列为基础服务区域。本站拒绝编造实测数值，将美国节点状态定为 REFERENCE_ONLY，待取得可信测量源后接入图表。",
    missingFields: [
      "跨洋海底光缆路由（TPE/NCP/FASTER 等）实际归属",
      "美西数据中心出口真实 IP 段",
      "AI 服务防欺诈风控 IP 纯净度检测报告",
      "连续测试样本集"
    ]
  }
];
