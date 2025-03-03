// =====================================
// ポートフォリオプロジェクトのデータを管理するファイル
// =====================================
// このファイルは、ポートフォリオセクションに表示されるプロジェクト情報を定義します。
// 各プロジェクトには、タイトル、説明、使用技術、画像などの詳細情報が含まれています。

import type { PortfolioItem } from "./types";

// =====================================
// ポートフォリオ項目の配列
// =====================================
// 各項目には以下の情報が含まれます：
// - id: プロジェクトの一意識別子
// - title: プロジェクトのタイトル
// - description: プロジェクトの簡潔な説明
// - thumbnail: サムネイル画像のパス
// - tags: 使用技術やカテゴリのタグ
// - demoUrl: デモサイトのURL（オプション）
// - githubUrl: GitHubリポジトリのURL（オプション）
// - details: プロジェクトの詳細情報
//   - overview: プロジェクトの概要
//   - features: 主な機能のリスト
//   - technologies: 使用技術のリスト
//   - challenges: 直面した課題
//   - solutions: 課題への解決策
//   - images: プロジェクト画像のパスリスト
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

// =====================================
// ポートフォリオ項目をIDで検索する関数
// =====================================
// @param id 検索するポートフォリオ項目のID
// @returns 見つかったポートフォリオ項目、または undefined
export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id);
}

// =====================================
// タグでポートフォリオ項目をフィルタリングする関数
// =====================================
// @param tag フィルタリングするタグ
// @returns 指定されたタグを持つポートフォリオ項目の配列
export function getPortfolioItemsByTag(tag: string): PortfolioItem[] {
  return portfolioItems.filter(item => item.tags.includes(tag));
}

// =====================================
// すべてのユニークなタグを取得する関数
// =====================================
// @returns ポートフォリオ内のすべてのユニークなタグの配列
export function getAllPortfolioTags(): string[] {
  const allTags = portfolioItems.flatMap(item => item.tags);
  return [...new Set(allTags)];
} 