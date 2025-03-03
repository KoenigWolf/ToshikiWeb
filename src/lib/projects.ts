// =====================================
// 職務経歴のプロジェクトデータを管理するファイル
// =====================================
// このファイルは、職務経歴セクションに表示されるプロジェクト情報を定義します。
// 各プロジェクトには、会社名、期間、役割、責任、環境、詳細などの情報が含まれています。

import type { Project } from "./types";

// =====================================
// プロジェクト情報の配列
// =====================================
// 各プロジェクトには以下の情報が含まれます：
// - id: プロジェクトの一意識別子
// - title: プロジェクトのタイトル
// - company: 会社名
// - period: 期間
// - role: 役割
// - responsibilities: 責任・担当業務のリスト
// - environment: 使用技術・環境のリスト
// - overview: プロジェクトの概要（オプション）
// - details: 詳細業務内容のリスト
// - achievements: 成果・実績のリスト（オプション）
export const projects: Project[] = [
  {
    id: "web-dev",
    title: "Web サイト制作（副業：個人開発）",
    company: "個人開発",
    period: "2024年3月 ～ 2025年3月",
    role: "フルスタックエンジニア",
    responsibilities: [
      "要件定義", 
      "詳細設計", 
      "フロントエンド開発", 
      "バックエンド開発", 
      "デプロイ作業全般"
    ],
    environment: [
      "Next.js 13", 
      "React 18", 
      "TailwindCSS", 
      "AWS"
    ],
    overview: "動画クリエイター向け Web サイトを構築。Next.js App Router を採用し、サーバーコンポーネントとクライアントコンポーネントを適切に分離。TailwindCSS を用いたモダンかつレスポンシブなデザイン、SEO 最適化、動的ルーティングを実現。",
    details: [
      "クライアントの要望ヒアリング・要件策定、SEO 最適化・パフォーマンス向上・モバイルファーストのUI / UX 設計、ユーザー分析を基に Next.js アーキテクチャを決定",
      "Next.js App Router でページ設計・サーバー / クライアントコンポーネントを分離、Server Actions 導入でデータ取得最適化、動的ルーティングで SEO とパフォーマンスを両立",
      "TailwindCSS でコンポーネントベース UI 設計・レスポンシブ対応"
    ],
    achievements: [
      "フロントエンド、バックエンド、デプロイ環境を統合的に実装"
    ]
  },
  {
    id: "azure-security",
    title: "Microsoft Azure セキュリティエンジニア",
    company: "日本コンセントリクス株式会社",
    period: "2022年9月 ～ 2024年9月",
    role: "Microsoft Azure セキュリティエンジニア",
    responsibilities: [
      "Azure セキュリティの技術支援", 
      "脅威分析およびインシデント対応"
    ],
    environment: [
      "Microsoft Azure（Defender for Endpoint / Defender for Cloud / Sentinel）", 
      "WindowsPowerShell", 
      "Kusto Query Language"
    ],
    details: [
      "Microsoft Defender for Endpoint を活用したインシデント対応および脅威ハンティング",
      "Sentinel と KQL を用いた SIEM 運用とログ分析で、インシデントの可視化と対応効率化",
      "Azure Policy や Azure Blueprints を用い、セキュリティポリシーの最適化とゼロトラストセキュリティモデル導入支援",
      "アクセス制御と認証基盤の強化を推進"
    ],
    achievements: [
      "顧客評価平均 4.7 以上（5点満点）の高評価を獲得"
    ]
  },
  {
    id: "dynamics365",
    title: "Microsoft Dynamics 365 エンジニア",
    company: "日本コンセントリクス株式会社",
    period: "2021年9月 ～ 2022年9月",
    role: "Microsoft Dynamics 365 エンジニア",
    responsibilities: [
      "Dynamics 365 の導入支援", 
      "業務プロセス最適化", 
      "カスタム開発"
    ],
    environment: [
      "Microsoft Dynamics 365", 
      "Power Platform（Power Automate / Power Apps / Power BI）",
      "SQL", 
      "Dataverse", 
      "REST API"
    ],
    details: [
      "Power Automate を活用した RPA による業務プロセス自動化の支援",
      "Power Apps を用いたカスタム業務アプリの開発支援",
      "Power BI によるダッシュボード構築で、データ可視化と KPI 管理を強化",
      "Azure Logic Apps と Dataverse を利用し、外部システムとの API 連携"
    ],
    achievements: [
      "顧客評価平均 4.7 以上（5点満点）の高評価を獲得"
    ]
  },
  {
    id: "microsoft365",
    title: "Microsoft 365 エンジニア",
    company: "日本コンセントリクス株式会社",
    period: "2020年9月 ～ 2021年9月",
    role: "Microsoft 365 エンジニア",
    responsibilities: [
      "Microsoft 365 の導入および運用管理", 
      "情報管理基盤の最適化"
    ],
    environment: [
      "Microsoft 365（SharePoint Online / Teams / OneDrive for Business / Exchange Online）",
      "Microsoft Purview"
    ],
    details: [
      "SharePoint Online を活用した企業ポータルおよび情報共有基盤の設計・運用サポート",
      "Microsoft Teams / OneDrive for Business のガバナンス強化とアクセス制御最適化",
      "Microsoft Purview を利用した情報保護とデータガバナンスの強化"
    ],
    achievements: [
      "顧客評価平均 4.7 以上（5点満点）の高評価を獲得"
    ]
  },
  {
    id: "real-estate",
    title: "不動産売買営業",
    company: "株式会社 LogProstyle",
    period: "2019年2月 ～ 2020年5月",
    role: "不動産売買営業",
    responsibilities: [
      "顧客対応", 
      "契約交渉", 
      "市場分析", 
      "営業戦略策定"
    ],
    environment: [
      "オフライン・オンライン営業", 
      "Salesforce", 
      "SQL", 
      "Excel VBA"
    ],
    details: [
      "データ分析を活用し、営業プロセスの効率化および最適化を推進",
      "Salesforce の顧客データを SQL で分析し、購入意欲の高い顧客を特定",
      "成約率の高い物件の特徴抽出により、ターゲット層別のマーケティング施策を策定",
      "Excel VBA による営業 KPI の自動集計・レポート作成"
    ],
    achievements: [
      "不動産会社向けシステム営業で全国 1 位の実績を達成"
    ]
  },
  {
    id: "circuit-design",
    title: "電気回路設計エンジニア",
    company: "株式会社 メイテックフィルダーズ",
    period: "2017年4月 ～ 2019年1月",
    role: "電気回路設計エンジニア",
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
  }
];

// =====================================
// プロジェクトをIDで検索する関数
// =====================================
// @param id 検索するプロジェクトのID
// @returns 見つかったプロジェクト、または undefined
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

// =====================================
// 会社名でプロジェクトをフィルタリングする関数
// =====================================
// @param company フィルタリングする会社名
// @returns 指定された会社のプロジェクト配列
export function getProjectsByCompany(company: string): Project[] {
  return projects.filter(project => project.company === company);
}

// =====================================
// 期間でプロジェクトをソートする関数（新しい順）
// =====================================
// @returns 期間でソートされたプロジェクト配列のコピー
export function getSortedProjectsByDate(): Project[] {
  // 注: この実装は簡易的なものです。実際には日付文字列のパースが必要かもしれません
  return [...projects].sort((a, b) => {
    // 期間の最初の部分（例: "2024年3月"）を比較
    const dateA = a.period.split('～')[0].trim();
    const dateB = b.period.split('～')[0].trim();
    return dateB.localeCompare(dateA);
  });
} 