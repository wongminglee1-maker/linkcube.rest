import type { VerificationStatus } from './sources.ts';

export interface NetworkMeasurement {
  measurementId: string;
  provider: string;
  nodeId: string | null;
  regionId: string;
  entryRegion: string | null;
  exitRegion: string | null;
  testedAt: string; // ISO 8601 with timezone, e.g. 2026-10-31T08:00:00+08:00
  timezone: string; // e.g. "Asia/Shanghai (UTC+8)"
  sourceNetwork: string; // e.g. "China Telecom 1000M"
  testDevice: string; // e.g. "Windows 11 / Clash Verge Rev"
  testMethod: string; // e.g. "TCP Ping / Speedtest-cli / Traceroute"
  latencyMs: number | null; // null if unmeasured, DO NOT use 0
  jitterMs: number | null;
  packetLossPercent: number | null; // null if unmeasured, DO NOT use 0
  downloadMbps: number | null;
  uploadMbps: number | null;
  sampleCount: number | null;
  evidenceURL: string | null;
  verificationStatus: VerificationStatus;
  timeSlot: 'MORNING' | 'DAYTIME' | 'PEAK_EVENING' | 'LATE_NIGHT';
  notes: string;
}

/**
 * 测速时段定义（标准 Asia/Shanghai UTC+8 时区）：
 * - MORNING (早晨): 06:00 - 11:59
 * - DAYTIME (白天): 12:00 - 18:59
 * - PEAK_EVENING (晚高峰): 19:00 - 23:59 (国际出口最易拥堵拥塞区间)
 * - LATE_NIGHT (深夜): 00:00 - 05:59
 */
export const timeSlotDefinitions = {
  MORNING: { label: "早晨时段", timeRange: "06:00 - 11:59 (UTC+8)", desc: "运营商国际出口负载较低，通常呈现基础低延迟与极低丢包。" },
  DAYTIME: { label: "白天使段", timeRange: "12:00 - 18:59 (UTC+8)", desc: "企业级跨国协同与日常办公流量峰期，线路表现相对平稳。" },
  PEAK_EVENING: { label: "晚高峰时段", timeRange: "19:00 - 23:59 (UTC+8)", desc: "民用宽带流媒体与国际流量最高峰，公网丢包率极易大幅上升，专线稳定性关键检验窗口。" },
  LATE_NIGHT: { label: "深夜时段", timeRange: "00:00 - 05:59 (UTC+8)", desc: "骨干网轻载状态，可测得物理线路的理论纯净延迟极限。" }
};

/**
 * 生产环境真实测量数据集：
 * 遵循严格的数据诚信原则：在未取得第三方机构或本站带原始认证的测试导出文件前，不插入任何伪造的实测记录。
 * 该数组当前为空，代表【尚未接入经审核的实际测速原始日志】。
 */
export const verifiedMeasurements: NetworkMeasurement[] = [];

/**
 * 数据结构范例（仅供数据模型校验与方法论页面技术展示，不参与正式实测图表绘制）：
 */
export const schemaSampleRecord: NetworkMeasurement = {
  measurementId: "sample-demo-schema-spec",
  provider: "LinkCube (待核验)",
  nodeId: null,
  regionId: "hong-kong",
  entryRegion: "中国广州 (BGP入口)",
  exitRegion: "中国香港",
  testedAt: "2026-10-31T20:30:00+08:00",
  timezone: "Asia/Shanghai (UTC+8)",
  sourceNetwork: "中国电信 1000M FTTH (仅作字段格式展示)",
  testDevice: "AMD Ryzen 7 / Windows 11 / sing-box core",
  testMethod: "连续 50 次 ICMP + TCP Handshake 综合采样",
  latencyMs: null, // 真实生产严禁假造数值
  jitterMs: null,
  packetLossPercent: null,
  downloadMbps: null,
  uploadMbps: null,
  sampleCount: null,
  evidenceURL: null,
  verificationStatus: "UNAVAILABLE",
  timeSlot: "PEAK_EVENING",
  notes: "此为标准数据规范模版，未包含任何伪造数据。"
};
