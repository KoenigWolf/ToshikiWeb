// =====================================
// Portfolio プロジェクトデータ
// =====================================
// ポートフォリオ項目の定義、管理、および関連ユーティリティ関数を提供

import type { PortfolioItem } from "@/lib/types/portfolio";

// ポートフォリオデータ
export const portfolioItems: PortfolioItem[] = [
  {
    id: "lp-kids",
    title: "留学サービスLP",
    description: "LPの基本構造を汎用的に使用するためのテンプレート",
    thumbnail: "/portfolio/kodomo.webp",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    demoUrl: "https://lp-kodomo.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/lp-kodomo.git",
    details: {
      overview: "LPの基本構造を汎用的に使用するためのテンプレート。",
      features: [
        "LPの基本構造を汎用的に使用するためのテンプレート。",
        "レスポンシブデザイン対応"
      ],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      challenges: "LPの基本構造を汎用的に使用すること。",
      solutions: "LPの基本構造を汎用的に使用すること。",
      images: []
    }
  },
  {
    id: "zeikin",
    title: "税金計算アプリ",
    description: "所得税や住民税を簡単に計算できるWebアプリケーション",
    thumbnail: "/portfolio/zeikin.webp",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    demoUrl: "https://zeikin.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/zeikin.git",
    details: {
      overview: "ユーザーが年収や控除額を入力することで、所得税や住民税を自動計算し、税負担の目安を提供するアプリケーション。",
      features: [
        "年収、控除額の入力フォーム",
        "所得税、住民税の自動計算",
        "税額のグラフ表示",
        "レスポンシブデザイン対応"
      ],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      challenges: "税制の複雑な計算ロジックを正確に実装すること。",
      solutions: "公式の税制資料を参照し、計算ロジックを詳細に設計・テストしました。",
      images: []
    }
  },
  {
    id: "vue-clock",
    title: "Vue.js デジタル時計",
    description: "リアルタイムで現在時刻を表示するシンプルなデジタル時計アプリ",
    thumbnail: "/portfolio/clock.webp",
    tags: ["Vue.js", "JavaScript", "CSS"],
    demoUrl: "https://vue-js-clock.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/Vue.js_clock.git",
    details: {
      overview: "Vue.jsを使用して構築した、現在時刻をリアルタイムで表示するデジタル時計アプリ。",
      features: [
        "リアルタイムの時刻表示",
        "12時間/24時間表示の切り替え",
        "カスタムスタイルの適用"
      ],
      technologies: ["Vue.js", "JavaScript", "CSS"],
      challenges: "リアルタイムでの時刻更新とパフォーマンスの最適化。",
      solutions: "JavaScriptの`setInterval`関数を用いて1秒ごとに時刻を更新し、最適なパフォーマンスを実現。",
      images: []
    }
  },
  {
    id: "bunkatu",
    title: "文章分割ツール",
    description: "指定した文字数でテキストを分割するWebアプリケーション",
    thumbnail: "/portfolio/bunkatu.webp",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    demoUrl: "https://bunkatu.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/bunkatu.git",
    details: {
      overview: "長文のテキストを指定した文字数ごとに分割し、扱いやすくするツール。",
      features: [
        "テキスト入力とクリア機能",
        "分割サイズの指定",
        "分割されたテキストの表示"
      ],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      challenges: "テキスト分割の効率化とユーザーインターフェースの最適化。",
      solutions: "効率的な文字列操作アルゴリズムを実装し、直感的なUIを設計。",
      images: [""]
    }
  }
];

/**
 * Portfolio項目をIDで検索する
 * @param id 検索するプロジェクトID
 * @returns 該当するPortfolio項目、または未定義
 */
export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id);
}

/**
 * タグでPortfolio項目をフィルタリングする
 * @param tag フィルタリングするタグ
 * @returns タグを含むPortfolio項目の配列
 */
export function getPortfolioItemsByTag(tag: string): PortfolioItem[] {
  return portfolioItems.filter(item => item.tags.includes(tag));
}

/**
 * すべてのユニークなタグを取得する
 * @returns 重複を排除したタグの配列
 */
export function getAllPortfolioTags(): string[] {
  const allTags = portfolioItems.flatMap(item => item.tags);
  return [...new Set(allTags)];
}