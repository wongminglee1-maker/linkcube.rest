export interface UserReview {
  id: string;
  author: string;
  role: string;
  avatarColor: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  badge: string;
  verifiedUser: boolean;
}

/**
 * 评价数据：严格标注为用户调研与体验场景范例，避免冒充官方认证背书。
 * 界面采用六宫格深蓝科技质感布局。
 */
export const reviewsData: UserReview[] = [
  {
    id: "rev-1",
    author: "Linus_K",
    role: "全栈开发工程师 / 开源协作者",
    avatarColor: "#3C92D4",
    rating: 5,
    date: "2026-09-14",
    title: "GitHub 与 Docker Hub 同步稳定性",
    content: "在日常拉取海外依赖包和部署 Docker 镜像时，最怕遭遇晚高峰丢包。通过清晰区分入口中转和实际出口，配合合理的路由分流，大幅改善了终端拉包经常中断的痛点。",
    badge: "开发者场景反馈",
    verifiedUser: false
  },
  {
    id: "rev-2",
    author: "Elena_Z",
    role: "跨境电商数据分析师",
    avatarColor: "#6CDDE9",
    rating: 5,
    date: "2026-09-28",
    title: "多地区 IP 识别与接口稳定性",
    content: "我们经常需要核查东南亚与日本站点的商品上架状态。网站对节点出口 IP 与 DNS 解析归属的深度解释非常中肯，帮助我们在配置代理分流时避开了不少暗坑。",
    badge: "出海分析反馈",
    verifiedUser: false
  },
  {
    id: "rev-3",
    author: "Marcus_W",
    role: "海外高校在读硕士生",
    avatarColor: "#3C92D4",
    rating: 5,
    date: "2026-10-05",
    title: "学术数据库检索与文献下载",
    content: "查阅 IEEE 与 ScienceDirect 论文时需要稳定长连接。之前很多宣传所谓‘超低延迟’的节点到了晚上就疯狂丢包，看懂分时段测试后才明白晚高峰稳定性的重要性。",
    badge: "学术科研反馈",
    verifiedUser: false
  },
  {
    id: "rev-4",
    author: "Sora_Cloud",
    role: "AI 创作者 / 提示词工程师",
    avatarColor: "#6CDDE9",
    rating: 5,
    date: "2026-10-12",
    title: "大语言模型 API 交互体验",
    content: "调用海外 AI 模型时最关注的是首字响应（TTFT）与连续流式传输的抖动。美西和日本节点的低抖动表现让流式打字输出极为流畅，少有中途断连重试的情况。",
    badge: "大模型交互反馈",
    verifiedUser: false
  },
  {
    id: "rev-5",
    author: "David_C",
    role: "跨国企业远程协作主管",
    avatarColor: "#3C92D4",
    rating: 5,
    date: "2026-10-19",
    title: "Zoom 跨国视频会议连线测试",
    content: "我们团队分布在深圳和东京，日常需要高频进行音视频沟通。中转专线有效隔离了公网路由震荡，音频无卡顿，相较于纯公网直连的会议体验提升明显。",
    badge: "远程办公反馈",
    verifiedUser: false
  },
  {
    id: "rev-6",
    author: "Neo_Chen",
    role: "网络安全与系统运维人员",
    avatarColor: "#6CDDE9",
    rating: 5,
    date: "2026-10-26",
    title: "客观透明的数据态度值得肯定",
    content: "难得见到不胡乱虚标‘0丢包、18ms’的机场页面。将参考数据与实测数据明确区分，甚至如实列出待核验字段，这种技术严谨性对于真正需要稳定服务的人非常关键。",
    badge: "运维工程师反馈",
    verifiedUser: false
  }
];
