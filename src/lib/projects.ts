// =============================
// 職務経歴のプロジェクトデータを管理するファイル
// =============================
// このファイルは、職務経歴セクションに表示されるプロジェクト情報を定義します。
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
// プロジェクト情報の配列
// =============================
export const projects: Project[] = [
  {
    id: "web-dev",
    title: "Web サイト制作（個人開発）",
    company: "個人開発",
    period: "2024年3月 ～ 2025年3月",
    role: "フルスタックエンジニア",
    responsibilities: ["要件定義", "詳細設計", "フロントエンド開発", "バックエンド開発", "デプロイ作業"],
    environment: [...ProjectEnvironment.FRONTEND, "AWS"],
    overview: "動画クリエイター向け Web サイトを構築。Next.js App Router を採用し、最新技術を活用。",
    details: [
      "SEO最適化・モバイルファーストのUI/UX設計",
      "Next.js App Routerを活用した最適なページ設計",
      "TailwindCSSによるモダンなコンポーネント設計"
    ],
    achievements: ["フロントエンド、バックエンド、デプロイ環境を統合的に実装"]
  },
  {
    id: "azure-security",
    title: "Microsoft Azure セキュリティエンジニア",
    company: "日本コンセントリクス株式会社",
    period: "2022年9月 ～ 2024年9月",
    role: "Microsoft Azure セキュリティエンジニア",
    responsibilities: ["Azure セキュリティの技術支援", "脅威分析およびインシデント対応"],
    environment: [...ProjectEnvironment.CLOUD, ...ProjectEnvironment.SECURITY, "PowerShell", "KQL"],
    details: [
      "Microsoft Defender for Endpoint によるインシデント対応",
      "Azure Sentinel での SIEM 運用とログ分析",
      "ゼロトラストセキュリティモデル導入支援"
    ],
    achievements: ["顧客評価平均 4.7 以上（5点満点）の高評価を獲得"]
  },
  {
    id: "dynamics365",
    title: "Microsoft Dynamics 365 エンジニア",
    company: "日本コンセントリクス株式会社",
    period: "2021年9月 ～ 2022年9月",
    role: "Microsoft Dynamics 365 エンジニア",
    responsibilities: ["Dynamics 365 の導入支援", "業務プロセス最適化", "カスタム開発"],
    environment: [...ProjectEnvironment.BUSINESS, "Dataverse", "REST API"],
    details: [
      "Power Automate を活用した RPA による業務プロセス自動化",
      "Power Apps での業務アプリ開発",
      "Power BI によるデータ可視化"
    ],
    achievements: ["顧客評価平均 4.7 以上の高評価を獲得"]
  },
  {
    id: "microsoft365",
    title: "Microsoft 365 エンジニア",
    company: "日本コンセントリクス株式会社",
    period: "2020年9月 ～ 2021年9月",
    role: "Microsoft 365 エンジニア",
    responsibilities: ["Microsoft 365 の導入および運用管理", "情報管理基盤の最適化"],
    environment: [...ProjectEnvironment.BUSINESS, "Microsoft Purview"],
    details: [
      "SharePoint Online を活用した企業ポータルおよび情報共有基盤の設計・運用",
      "Microsoft Teams / OneDrive のガバナンス強化とアクセス制御最適化",
      "Microsoft Purview による情報保護とデータガバナンス強化"
    ],
    achievements: ["顧客評価平均 4.7 以上（5点満点）の高評価を獲得"]
  }
];

// =============================
// 資格情報
// =============================
export const certifications: Certification[] = [
  {
    id: "az-900",
    name: "AZ-900：Microsoft Azure Fundamentals",
    date: "2023年1月",
    issuer: "Microsoft"
  },
  {
    id: "pl-900",
    name: "PL-900：Power Platform Fundamentals",
    date: "2022年8月",
    issuer: "Microsoft"
  },
  {
    id: "drivers-license",
    name: "普通自動車免許第一種",
    date: "2010年4月",
    issuer: "日本政府"
  }
];

// =============================
// 関数: プロジェクトを ID で検索する
// =============================
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

// =============================
// 関数: 会社名でプロジェクトをフィルタリング
// =============================
export function getProjectsByCompany(company: string): Project[] {
  return projects.filter(project => project.company === company);
}

// =============================
// 関数: 期間でプロジェクトをソート（新しい順）
// =============================
export function getSortedProjectsByDate(): Project[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.period.split("～")[0].trim().replace("年", "-").replace("月", ""));
    const dateB = new Date(b.period.split("～")[0].trim().replace("年", "-").replace("月", ""));
    return dateB.getTime() - dateA.getTime();
  });
}

// =============================
// 関数: 環境（技術）でプロジェクトをフィルタリング
// =============================
export function getProjectsByTechnology(tech: string): Project[] {
  return projects.filter(project => project.environment.includes(tech));
}

// =============================
// 関数: 役割でプロジェクトをフィルタリング
// =============================
export function getProjectsByRole(role: string): Project[] {
  return projects.filter(project => project.role === role);
}

// =============================
// 関数: すべてのユニークな技術スタックを取得
// =============================
export function getAllTechnologies(): string[] {
  const allTech = projects.flatMap(project => project.environment);
  return [...new Set(allTech)];
}
