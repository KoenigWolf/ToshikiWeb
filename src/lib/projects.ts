// =============================
// Careerのプロジェクトデータを管理するファイル
// =============================
// このファイルは、Careerセクションに表示されるプロジェクト情報を定義します。
// 各プロジェクトには、会社名、期間、役割、責任、使用技術、詳細業務、成果などの情報が含まれています。

import type { Project, Certification } from "./types";

// =============================
// 定数: プロジェクトの使用技術（環境）リスト
// =============================
const ProjectEnvironment = {
  FRONTEND: ["Next.js", "React", "Vue.js", "TailwindCSS", "TypeScript"],
  BACKEND: ["Node.js", "Express", "SQL", "REST API"],
  CLOUD: ["Microsoft Azure", "AWS", "Azure Functions"],
  SECURITY: ["Defender for Endpoint", "Defender for Cloud", "Sentinel"],
  BUSINESS: ["Dynamics 365", "Power Platform", "SharePoint Online"],
  TOOLS: ["Git", "Excel VBA", "Power Automate"]
} as const;

// =============================
// プロジェクト情報の定義
// =============================
// プロジェクトの基本情報を定義する型
type ProjectBase = Omit<Project, 'id'> & { id: string };

// プロジェクト情報を生成する関数
const createProject = (project: ProjectBase): Project => project;

// =============================
// プロジェクト情報の配列
// =============================
export const projects: Project[] = [
  createProject({
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
  createProject({
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
  createProject({
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
  createProject({
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
  createProject({
    id: "real-estate",
    title: "不動仲介営業",
    company: "株式会社LogProstyle",
    period: "2019年2月 ～ 2020年5月",
    role: "不動産仲介営業",
    responsibilities: [
      "顧客対応", 
      "契約交渉", 
      "市場分析", 
      "営業戦略策定"
    ],
    environment: [
      "オフライン・オンライン営業", 
      "Salesforce", 
      "Excel VBA"
    ],
    details: [
      "データ分析を活用し、営業プロセスの効率化および最適化を推進",
      "成約率の高い物件の特徴抽出により、ターゲット層別のマーケティング施策を策定",
      "Excel VBA による営業 KPI の自動集計・レポート作成"
    ],
    achievements: [
      "不動産会社向けシステム営業成績全国１位の実績を達成"
    ]
  }),
  createProject({
    id: "circuit-design",
    title: "電装回路設計エンジニア",
    company: "株式会社メイテック",
    period: "2017年4月 ～ 2019年1月",
    role: "電装回路設計エンジニア",
    responsibilities: [
      "ECU センサー回路設計", 
      "基板設計回路評価", 
      "テスト", 
      "プロジェクト進行管理"
    ],
    environment: [
      "CATIA V5"
    ],
    overview: "自動車用電子制御ユニット（ECU）およびセンサー回路の設計を担当。基板レイアウトから回路評価、シミュレーションによる最適化まで幅広く従事。",
    details: [
      "自動車用 ECU の回路設計および基板レイアウト設計、シミュレーションによる電気特性最適化",
      "システムレベルの電磁適合性評価を実施し、ノイズ耐性向上を目的としたフィルタ回路の設計",
      "静電気耐性試験、温度試験、振動試験などのハードウェアテストを実施"
    ]
  })
];

// =============================
// 資格情報の定義
// =============================
// 資格情報の基本情報を定義する型
type CertificationBase = Omit<Certification, 'id'> & { id: string };

// 資格情報を生成する関数
const createCertification = (certification: CertificationBase): Certification => certification;

// =============================
// 資格情報の配列
// =============================
export const certifications: Certification[] = [
  createCertification({
    id: "az-900",
    name: "AZ-900：Microsoft Azure Fundamentals",
    date: "2023年1月",
    issuer: "Microsoft"
  }),
  createCertification({
    id: "pl-900",
    name: "PL-900：Power Platform Fundamentals",
    date: "2022年8月",
    issuer: "Microsoft"
  }),
  createCertification({
    id: "drivers-license",
    name: "普通自動車免許第一種",
    date: "2010年4月",
    issuer: "日本政府"
  })
];

// =============================
// プロジェクト関連のユーティリティ関数
// =============================

/**
 * プロジェクトをIDで検索する関数
 * @param id 検索するプロジェクトのID
 * @returns 該当するプロジェクト、または見つからない場合はundefined
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

/**
 * 会社名でプロジェクトをフィルタリングする関数
 * @param company フィルタリングする会社名
 * @returns 該当する会社のプロジェクト配列
 */
export function getProjectsByCompany(company: string): Project[] {
  return projects.filter(project => project.company === company);
}

/**
 * 期間でプロジェクトをソートする関数（新しい順）
 * @returns 日付でソートされたプロジェクト配列
 */
export function getSortedProjectsByDate(): Project[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.period.split("～")[0].trim().replace("年", "-").replace("月", ""));
    const dateB = new Date(b.period.split("～")[0].trim().replace("年", "-").replace("月", ""));
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * 環境（技術）でプロジェクトをフィルタリングする関数
 * @param tech フィルタリングする技術名
 * @returns 該当する技術を使用したプロジェクト配列
 */
export function getProjectsByTechnology(tech: string): Project[] {
  return projects.filter(project => project.environment.includes(tech));
}

/**
 * 役割でプロジェクトをフィルタリングする関数
 * @param role フィルタリングする役割名
 * @returns 該当する役割のプロジェクト配列
 */
export function getProjectsByRole(role: string): Project[] {
  return projects.filter(project => project.role === role);
}

/**
 * すべてのユニークな技術スタックを取得する関数
 * @returns ユニークな技術スタックの配列
 */
export function getAllTechnologies(): string[] {
  const allTech = projects.flatMap(project => project.environment);
  return [...new Set(allTech)];
}
