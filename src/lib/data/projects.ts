import type { Project, Certification } from "./types";

export const ProjectEnvironment = {
  FRONTEND: ["Next.js", "React", "Vue.js", "TailwindCSS", "TypeScript"],
  BACKEND: ["Node.js", "Express", "SQL", "REST API"],
  CLOUD: ["Microsoft Azure", "AWS", "Azure Functions"],
  SECURITY: ["Defender for Endpoint", "Defender for Cloud", "Sentinel"],
  BUSINESS: ["Dynamics 365", "Power Platform", "SharePoint Online"],
  TOOLS: ["Git", "Excel VBA", "Power Automate"],
} as const;

const create = <T extends { id: string }>(data: T): T => data;

export const projects: Readonly<Project[]> = [
  create({
    id: "web-dev",
    title: "Web サイト制作（個人開発）",
    company: "個人開発",
    period: "2024年3月 ～ 現在",
    role: "フロントエンドエンジニア",
    responsibilities: ["要件定義", "詳細設計", "フロントエンド開発", "デプロイ作業"],
    environment: [...ProjectEnvironment.FRONTEND, "Vercel"],
    overview: "クリエイター向け Web サイトを構築。Next.js App Router を採用し、最新技術を活用。",
    details: [
      "SEO最適化・モバイルファーストのUI/UX設計",
      "Next.js App Routerを活用した最適なページ設計",
      "TailwindCSSによるモダンなコンポーネント設計"
    ],
    achievements: ["フロントエンド、デプロイ環境を統合的に実装"]
  }),
  create({
    id: "azure-security",
    title: "Microsoft Azure エンジニア",
    company: "Concentrix Japan",
    period: "2022年9月 ～ 2024年9月",
    role: "Microsoft Azure",
    responsibilities: ["Azure セキュリティの技術支援", "脅威分析およびインシデント対応"],
    environment: [...ProjectEnvironment.CLOUD, ...ProjectEnvironment.SECURITY, "PowerShell", "KQL"],
    details: [
      "Microsoft Defender for Endpoint によるインシデント対応",
      "Azure Sentinel での SIEM 運用とログ分析",
      "ゼロトラストセキュリティモデル導入支援"
    ],
    achievements: ["顧客評価平均 4.7 以上（5点満点）の高評価を獲得"]
  }),
  create({
    id: "dynamics365",
    title: "Microsoft Dynamics 365 エンジニア",
    company: "Concentrix Japan",
    period: "2021年9月 ～ 2022年9月",
    role: "Microsoft Dynamics 365",
    responsibilities: ["Dynamics 365 の導入支援", "業務プロセス最適化", "カスタム開発"],
    environment: [...ProjectEnvironment.BUSINESS, "Dataverse", "REST API"],
    details: [
      "Power Automate を活用した RPA による業務プロセス自動化支援",
      "Power Apps での業務アプリ開発支援",
      "Power BI によるデータ可視化支援"
    ],
    achievements: ["顧客評価平均 4.7 以上の高評価を獲得"]
  }),
  create({
    id: "microsoft365",
    title: "Microsoft 365 エンジニア",
    company: "Concentrix Japan",
    period: "2020年9月 ～ 2021年9月",
    role: "Microsoft 365",
    responsibilities: ["Microsoft 365 の導入および運用管理", "情報管理基盤の最適化"],
    environment: [...ProjectEnvironment.BUSINESS, "Microsoft Purview"],
    details: [
      "SharePoint Online を活用した企業ポータルおよび情報共有基盤の設計・運用支援",
      "Microsoft Teams / OneDrive のガバナンス強化とアクセス制御最適化支援",
      "Microsoft Purview による情報保護とデータガバナンス強化支援"
    ],
    achievements: ["顧客評価平均 4.7 以上（5点満点）の高評価を獲得"]
  }),
  create({
    id: "real-estate",
    title: "不動産仲介営業",
    company: "株式会社LogProstyle",
    period: "2019年2月 ～ 2020年5月",
    role: "不動産仲介営業",
    responsibilities: ["顧客対応", "契約交渉", "市場分析", "営業戦略策定"],
    environment: ["オフライン・オンライン営業", "Salesforce", "Excel VBA"],
    details: [
      "データ分析を活用し、営業プロセスの効率化および最適化を推進",
      "成約率の高い物件の特徴抽出により、ターゲット層別のマーケティング施策を策定",
      "Excel VBA による営業 KPI の自動集計・レポート作成"
    ],
    achievements: ["不動産会社向けシステム営業成績全国１位の実績を達成"]
  }),
  create({
    id: "circuit-design",
    title: "電装回路設計エンジニア",
    company: "株式会社メイテック",
    period: "2017年4月 ～ 2019年1月",
    role: "電装回路設計エンジニア",
    responsibilities: ["ECU センサー回路設計", "基板設計回路評価", "テスト", "プロジェクト進行管理"],
    environment: ["CATIA V5"],
    overview: "自動車用電子制御ユニット（ECU）およびセンサー回路の設計を担当。基板レイアウトから回路評価、シミュレーションによる最適化まで幅広く従事。",
    details: [
      "自動車用 ECU の回路設計および基板レイアウト設計、シミュレーションによる電気特性最適化",
      "システムレベルの電磁適合性評価を実施し、ノイズ耐性向上を目的としたフィルタ回路の設計",
      "静電気耐性試験、温度試験、振動試験などのハードウェアテストを実施"
    ]
  })
];

// --- ユーティリティ関数 ---
// 日本語の期間文字列を Date に変換
function parseJapaneseDate(dateStr: string): Date {
  const cleaned = dateStr.split("～")[0].trim().replace("年", "-").replace("月", "");
  return new Date(cleaned);
}

// IDからプロジェクト取得
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

// 会社名で絞り込み
export const getProjectsByCompany = (company: string): Project[] => {
  return projects.filter((p) => p.company === company);
};

// 技術タグで絞り込み
export const getProjectsByTechnology = (tech: string): Project[] => {
  return projects.filter((p) => p.environment.includes(tech));
};

// ロールで絞り込み
export const getProjectsByRole = (role: string): Project[] => {
  return projects.filter((p) => p.role === role);
};

// 日付順ソート（新しい順）
export const getSortedProjectsByDate = (): Project[] => {
  return [...projects].sort((a, b) => parseJapaneseDate(b.period).getTime() - parseJapaneseDate(a.period).getTime());
};

// ユニークな技術スタック一覧
export const getAllTechnologies = (): string[] => {
  return [...new Set(projects.flatMap((p) => p.environment))];
};
