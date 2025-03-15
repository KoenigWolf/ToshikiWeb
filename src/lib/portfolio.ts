// Portfolioプロジェクトのデータを管理するファイル
// 各プロジェクトの詳細情報（タイトル、説明、使用技術、画像など）を定義

import type { PortfolioItem } from "./types";

// Portfolioデータ
export const portfolioItems: PortfolioItem[] = [
  // プロジェクト: 税金計算アプリ
  {
    id: "zeikin", // 一意なプロジェクトID
    title: "税金計算アプリ", // プロジェクトタイトル
    description: "所得税や住民税を簡単に計算できるWebアプリケーション", // 簡単な説明
    thumbnail: "/portfolio/zeikin.webp", // サムネイル画像のパス
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"], // 使用技術タグ
    demoUrl: "https://zeikin.vercel.app/", // デモサイトのURL
    githubUrl: "https://github.com/KoenigWolf/zeikin.git", // GitHubリポジトリのURL
    details: {
      overview:
        "ユーザーが年収や控除額を入力することで、所得税や住民税を自動計算し、税負担の目安を提供するアプリケーション。",
      features: [
        "年収、控除額の入力フォーム",
        "所得税、住民税の自動計算",
        "税額のグラフ表示",
        "レスポンシブデザイン対応"
      ],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      challenges:
        "税制の複雑な計算ロジックを正確に実装すること。",
      solutions:
        "公式の税制資料を参照し、計算ロジックを詳細に設計・テストしました。",
      images: [] // 画像があれば格納する配列
    }
  },
  // プロジェクト: Vue.js デジタル時計
  {
    id: "vue-clock",
    title: "Vue.js デジタル時計",
    description:
      "リアルタイムで現在時刻を表示するシンプルなデジタル時計アプリ",
    thumbnail: "/portfolio/clock.webp",
    tags: ["Vue.js", "JavaScript", "CSS"],
    demoUrl: "https://vue-js-clock.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/Vue.js_clock.git",
    details: {
      overview:
        "Vue.jsを使用して構築した、現在時刻をリアルタイムで表示するデジタル時計アプリ。",
      features: [
        "リアルタイムの時刻表示",
        "12時間/24時間表示の切り替え",
        "カスタムスタイルの適用"
      ],
      technologies: ["Vue.js", "JavaScript", "CSS"],
      challenges:
        "リアルタイムでの時刻更新とパフォーマンスの最適化。",
      solutions:
        "JavaScriptの`setInterval`関数を用いて1秒ごとに時刻を更新し、最適なパフォーマンスを実現。",
      images: [] // 画像があれば格納する配列
    }
  },
  // プロジェクト: 文章分割ツール
  {
    id: "bunkatu",
    title: "文章分割ツール",
    description:
      "指定した文字数でテキストを分割するWebアプリケーション",
    thumbnail: "/portfolio/bunkatu.webp",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    demoUrl: "https://bunkatu.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/bunkatu.git",
    details: {
      overview:
        "長文のテキストを指定した文字数ごとに分割し、扱いやすくするツール。",
      features: [
        "テキスト入力とクリア機能",
        "分割サイズの指定",
        "分割されたテキストの表示"
      ],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      challenges:
        "テキスト分割の効率化とユーザーインターフェースの最適化。",
      solutions:
        "効率的な文字列操作アルゴリズムを実装し、直感的なUIを設計。",
      images: [""] // 画像パスがあれば格納する配列
    }
  }
];

// Portfolio項目をIDで検索する関数
// 指定したIDに一致するPortfolio項目を返す（見つからなければundefined）
export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id);
}

// タグでPortfolio項目をフィルタリングする関数
// 指定したタグを含むPortfolio項目の配列を返す
export function getPortfolioItemsByTag(tag: string): PortfolioItem[] {
  return portfolioItems.filter(item => item.tags.includes(tag));
}

// すべてのユニークなタグを取得する関数
// Portfolio内の全項目からタグを抽出し、重複を排除して返す
export function getAllPortfolioTags(): string[] {
  const allTags = portfolioItems.flatMap(item => item.tags);
  return [...new Set(allTags)];
}
