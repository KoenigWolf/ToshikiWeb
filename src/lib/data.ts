import type { PersonalInfo, Project, Certification, SkillCategory, PortfolioItem } from "./types";

// =============================
// 個人情報
// =============================
export const personalInfo: PersonalInfo = {
  name: "Toshiki Sakuta",
  nameEn: "Toshiki Sakuta",
  summary: "クラウド技術、業務自動化、インフラ運用、Web開発を幅広く経験し、技術とビジネスの両面で価値を創出。Microsoft Azure を活用した設計・運用・自動化を通じて企業の生産性向上に貢献。PM 経験を活かし、業務課題を分析し最適な技術ソリューションを提案・実装。Microsoft 365・Dynamics 365 導入支援、セキュリティ対策、データ分析基盤構築など、多様なプロジェクトに携わる。",
};

// =============================
// プロジェクト一覧
// =============================
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

// =============================
// 資格一覧
// =============================
export const certifications: Certification[] = [
  {
    id: "az-900",
    name: "AZ-900：Microsoft Azure Fundamentals",
    date: "2023年1月"
  },
  {
    id: "pl-900",
    name: "PL-900：Power Platform Fundamentals",
    date: "2022年8月"
  },
  {
    id: "drivers-license",
    name: "普通自動車免許第一種",
    date: "2010年4月"
  }
];

// =============================
// 自己PR
// =============================
export const selfPR = `私は、クラウド技術・業務自動化・インフラ運用の知見を有しています。Microsoft Azure や Power Platform を活用したシステム設計・自動化を得意とし、業務効率化やデータ活用基盤の最適化を実現してきました。業務フローの自動化により、手作業を大幅に削減し、データの可視化と意思決定のスピードを向上させるなど、技術を駆使して現場の課題解決に取り組んできました。
さらに、接客業での経験を通じて、人の動きやニーズを深く理解する力を培いました。この経験により、単なる数値分析にとどまらず、実際のユーザー体験や業務フローの改善につながるデータ活用を意識できることが強みです。データを活用しながら、現場に寄り添った最適なソリューションを提供する視点を持っています。`;

// =============================
// スキル一覧
// =============================
export const skills: SkillCategory[] = [
  { category: "フロントエンド", items: ["React", "Next.js", "TailwindCSS", "HTML/CSS", "JavaScript/TypeScript"] },
  { category: "バックエンド", items: ["Node.js", "Express", "REST API"] },
  { category: "クラウド", items: ["Microsoft Azure", "AWS", "Azure Functions", "Azure Logic Apps"] },
  { category: "データベース", items: ["SQL", "Dataverse"] },
  { category: "ツール・その他", items: ["Git", "Power Platform", "Microsoft 365", "Dynamics 365", "Excel VBA"] },
  { category: "セキュリティ", items: ["Azure Security", "Defender for Cloud", "Sentinel", "ゼロトラストセキュリティ"] }
];

// =============================
// ポートフォリオ一覧
// =============================
export const portfolioItems: PortfolioItem[] = [
  {
    id: "personal-portfolio",
    title: "ポートフォリオサイト",
    description: "Next.js と TailwindCSS を使用した個人ポートフォリオサイト",
    thumbnail: "/portfolio/portfolio-thumbnail.jpg",
    tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    githubUrl: "https://github.com/KoenigWolf/portfolio",
    details: {
      overview: "Next.js App Router と TailwindCSS を使用して構築した個人ポートフォリオサイト。モダンなデザインとアニメーションを取り入れ、レスポンシブ対応しています。",
      features: [
        "レスポンシブデザイン",
        "ダークモード対応",
        "Framer Motion によるアニメーション",
        "shadcn/ui コンポーネント",
        "タイプセーフなデータ管理"
      ],
      technologies: [
        "Next.js 15",
        "React 18",
        "TypeScript",
        "TailwindCSS",
        "Framer Motion",
        "shadcn/ui"
      ],
      challenges: "モダンなデザインとパフォーマンスの両立、アニメーションの最適化、SEO対策などが課題でした。",
      solutions: "App Router の SSR 機能を活用し、パフォーマンスを最適化。コンポーネントの分割と遅延読み込みを実装し、初期表示速度を向上させました。また、Framer Motion のアニメーションを効果的に使用しつつ、パフォーマンスへの影響を最小限に抑えました。",
      images: [
        "/portfolio/portfolio-1.jpg",
        "/portfolio/portfolio-2.jpg",
        "/portfolio/portfolio-3.jpg"
      ]
    }
  },
  {
    id: "task-management-app",
    title: "タスク管理アプリ",
    description: "React と Firebase を使用したタスク管理アプリケーション",
    thumbnail: "/portfolio/task-app-thumbnail.jpg",
    tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://task-management-app-demo.vercel.app",
    githubUrl: "https://github.com/KoenigWolf/task-management-app",
    details: {
      overview: "React と Firebase を使用して構築したタスク管理アプリケーション。ユーザー認証、リアルタイムデータベース、クラウドストレージを活用しています。",
      features: [
        "ユーザー認証（メール、Google、GitHub）",
        "タスクの作成、編集、削除",
        "タスクのカテゴリ分け",
        "ドラッグ＆ドロップでのタスク並べ替え",
        "タスクの進捗状況の視覚化",
        "レスポンシブデザイン"
      ],
      technologies: [
        "React",
        "TypeScript",
        "Firebase Authentication",
        "Firestore Database",
        "Tailwind CSS",
        "React DnD (Drag and Drop)"
      ],
      challenges: "リアルタイムデータの同期、複数デバイス間での一貫したユーザー体験の提供、オフライン機能の実装が課題でした。",
      solutions: "Firebase のリアルタイムデータベースを活用し、データの即時反映を実現。また、オフラインモードでもアプリが機能するよう、Service Worker とローカルストレージを組み合わせて実装しました。",
      images: [
        "/portfolio/task-app-1.jpg",
        "/portfolio/task-app-2.jpg",
        "/portfolio/task-app-3.jpg"
      ]
    }
  },
  {
    id: "e-commerce-dashboard",
    title: "ECサイト管理ダッシュボード",
    description: "Next.js と Chart.js を使用した ECサイト管理ダッシュボード",
    thumbnail: "/portfolio/dashboard-thumbnail.jpg",
    tags: ["Next.js", "Chart.js", "Tailwind CSS", "TypeScript", "Prisma"],
    demoUrl: "https://ecommerce-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/KoenigWolf/ecommerce-dashboard",
    details: {
      overview: "Next.js と Chart.js を使用して構築した ECサイト管理ダッシュボード。売上データの可視化、在庫管理、顧客分析などの機能を提供します。",
      features: [
        "リアルタイム売上データの可視化",
        "在庫管理システム",
        "顧客分析ツール",
        "注文処理ワークフロー",
        "レポート生成機能",
        "ダークモード対応"
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Chart.js",
        "Tailwind CSS",
        "Prisma ORM",
        "PostgreSQL",
        "NextAuth.js"
      ],
      challenges: "大量のデータの効率的な処理と表示、複雑なフィルタリングとソート機能の実装、セキュアなデータアクセス制御が課題でした。",
      solutions: "サーバーサイドでのデータ集計処理を実装し、クライアントへの負荷を軽減。また、効率的なデータフェッチングのために SWR を活用し、ユーザー体験を向上させました。ロールベースのアクセス制御システムを構築し、データセキュリティを確保しています。",
      images: [
        "/portfolio/dashboard-1.jpg",
        "/portfolio/dashboard-2.jpg",
        "/portfolio/dashboard-3.jpg"
      ]
    }
  }
];
