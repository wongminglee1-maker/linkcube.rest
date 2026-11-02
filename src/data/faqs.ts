export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  relatedArticleSlug?: string;
  relatedArticleTitle?: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "LinkCube 是什么？",
    answer: "LinkCube（中文参考名称：绿叶 LinkCube）是一个专注于跨国网络优化、代理协议分发与海外应用加速的品牌体系。其服务涵盖多端客户端适配、多地区节点接入以及针对流媒体与大模型交互的网络线路分流。本站 linkcube.rest 则作为其官方风格的数据落地页与技术科普中心，以透明、严谨的数据叙事方式帮助用户理解网络性能背后的真实原理。",
    relatedArticleSlug: "linkcube-region-evidence",
    relatedArticleTitle: "LinkCube 节点地区资料核查指南"
  },
  {
    id: "faq-2",
    question: "LinkCube 公开资料提到了哪些节点地区？",
    answer: "在其公开的技术文档与推广页面中，重点提及了中国香港、日本东京、新加坡以及美国西海岸等核心网络枢纽。这些地区覆盖了大中华区协同、亚太低延迟互联与北美大模型访问的主流场景需求。需要注意的是，公开资料的提及仅证明其规划或支持该区域出口，并不等同于当前可用节点清单，详见本站的地区证据分级。",
    relatedArticleSlug: "linkcube-region-evidence",
    relatedArticleTitle: "香港、日本、新加坡与美国节点资料核查"
  },
  {
    id: "faq-3",
    question: "地区介绍是否等于节点已经上线？",
    answer: "绝不相等。网络工程中，“地区介绍”通常仅代表服务商预设的业务场景规划或某批次出口部署，而“节点上线”需要具备可解析的入口服务器、活跃的落地出口 IP 段以及持续可连通的健康检查状态。在缺乏第三方实时连通性探测记录前，本站一律将其归类为 REFERENCE_ONLY（仅供参考），防止误导用户。",
    relatedArticleSlug: "linkcube-region-evidence",
    relatedArticleTitle: "公开资料提及与实际节点的严格区分"
  },
  {
    id: "faq-4",
    question: "如何核实节点真实出口地区？",
    answer: "核实节点真实出口不能仅看客户端界面上的节点别名。应在建立代理连接后，通过海外权威 IP 数据库（如 IPinfo、MaxMind、BGP.he.net）检查出口公网 IP 的 ASN 归属、自治系统组织、BGP 广播路径，并配合 WebRTC 泄漏测试与 DNS 归属地核验，确认流量是否真正从目标地区的数据中心离开隧道。",
    relatedArticleSlug: "linkcube-entry-exit",
    relatedArticleTitle: "入口与出口节点有什么区别及地区识别方法"
  },
  {
    id: "faq-5",
    question: "延迟和下载速度有什么区别？",
    answer: "延迟（Latency，通常以毫秒 ms 衡量）是数据包在客户端与远端服务器之间往返一次所消耗的时间，决定了网页秒开、按键交互、SSH 终端敲击与实时语音的跟手度；而下载速度（Bandwidth/Throughput，通常以 Mbps 衡量）是单位时间内传输的数据总量，决定了 4K 视频加载与大文件下载的耗时。高带宽并不必然等于低延迟，反之亦然。",
    relatedArticleSlug: "linkcube-time-series",
    relatedArticleTitle: "早晚高峰网络数据延迟与带宽指标解读"
  },
  {
    id: "faq-6",
    question: "为什么晚高峰可能出现延迟波动？",
    answer: "中国大陆国际出口公网在每日 19:00 至 23:59（北京时间）期间，承载着数以亿计的普通家庭并发流媒体与国际流量，运营商城域网骨干与互联互通网关极易发生队列积压与缓冲膨胀（Bufferbloat），从而导致公网丢包率骤升。即使是优质的内网专线，其国内入口段如果遭遇公网抖动，整体端到端链路也会表现出不同程度的延迟攀升。",
    relatedArticleSlug: "linkcube-time-series",
    relatedArticleTitle: "早晚高峰网络数据对比与分时段分析方法"
  },
  {
    id: "faq-7",
    question: "怎样判断测速数据是否可靠？",
    answer: "一份可信的测速报告必须同时具备：1. 精确到秒且含时区的时间戳；2. 明确的测试环境（本地运营商、接入带宽、测试硬件与客户端协议）；3. 完整的指标矩阵（延迟、抖动、丢包率、上下行速率）；4. 多次采样的样本量或连续测试日志；5. 对缺失指标如实标空，而非机械填零。任何宣称‘全天 0 丢包、全国 18ms’的单一截屏均不可轻信。",
    relatedArticleSlug: "linkcube-data-quality",
    relatedArticleTitle: "网络测速报告如何判断可信度与误差检查"
  },
  {
    id: "faq-8",
    question: "LinkCube 两个参考站的价格为什么不同？",
    answer: "参考站 linkcube.help 与 linkcube.biz 在套餐资费、流量配额（如 ¥15/80GB 对比 ¥12.8/180GB）及设备上限上存在明显出入。这通常源于不同历史时期的推广活动存留、不同渠道代理商的差异化定价或独立结算后台。由于未经官方订购库直接对齐，本站保持两组数据的独立记录，并提示用户在正式收银台结算时核实最终价格。",
    relatedArticleSlug: "linkcube-pricing-sources",
    relatedArticleTitle: "LinkCube 套餐价格为什么不同及购买前核验"
  },
  {
    id: "faq-9",
    question: "没有实测数据时应该怎样选择地区？",
    answer: "在未获得实测指标前，建议依据通用网络拓扑与业务需求进行保守选型：若重视交互响应速度（如日常网页浏览、远程办公协同），优先选择地理与网络距离较近的中国香港或日本；若核心需求为北美 AI 工具、海外官方开发者平台或特定流媒体版权库，则必须选择美国西海岸等具备原生 IP 识别能力的节点。",
    relatedArticleSlug: "linkcube-region-evidence",
    relatedArticleTitle: "地区选择决策与通用网络原理"
  },
  {
    id: "faq-10",
    question: "节点资料发生变化后如何检查更新？",
    answer: "优质的服务通常会动态维护节点池。用户应关注服务商提供的订阅配置更新机制（在客户端执行配置更新）。同时可参考本站提供的《资料持续更新与版本管理方法》，通过比对订阅链接下发内容的落地 ASN 变化、连通性探测以及变更日志（Changelog），建立长期的稳定性观察，避免因单一时段的波动做出草率判断。",
    relatedArticleSlug: "linkcube-region-updates",
    relatedArticleTitle: "节点地区和线路资料如何持续更新与长期检查"
  }
];
