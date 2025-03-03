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
    id: "zeikin",
    title: "税金計算アプリ",
    description: "税金を簡単に計算できる Web アプリケーション",
    thumbnail: "/portfolio/default-thumbnail.jpg",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    demoUrl: "https://zeikin.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/zeikin.git",
    details: {
      overview: "シンプルな UI で税金を計算できるアプリを開発。税率計算や控除の計算が可能。",
      features: [
        "リアルタイム税金計算機能",
        "各種税金の計算フォーミュラを適用",
        "レスポンシブデザイン",
        "ダークモード対応"
      ],
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      challenges: "計算式の正確性とパフォーマンスの最適化",
      solutions: "クライアントサイドでの計算処理とキャッシュを活用して高速化",
      images: [],
      autoFetchImages: true
    }
  },
  {
    id: "vue-clock",
    title: "Vue.js 時計アプリ",
    description: "Vue.js を使用したデジタル時計アプリ",
    thumbnail: "/portfolio/default-thumbnail.jpg",
    tags: ["Vue.js", "JavaScript", "CSS"],
    demoUrl: "https://vue-clock-demo.vercel.app",
    githubUrl: "https://github.com/KoenigWolf/Vue.js_clock.git",
    details: {
      overview: "Vue.js でリアルタイム更新可能なデジタル時計を開発。",
      features: [
        "リアルタイム時計表示",
        "アナログ時計とデジタル時計の切り替え",
        "テーマ変更（ライト / ダーク）"
      ],
      technologies: ["Vue.js", "JavaScript", "CSS"],
      challenges: "時計のスムーズな更新とパフォーマンスの最適化",
      solutions: "requestAnimationFrame を活用し、最適なレンダリングを実装",
      images: [],
      autoFetchImages: true
    }
  },
  {
    id: "bunkatu",
    title: "分割支払いシミュレーター",
    description: "支払いを複数回に分割してシミュレーションできるアプリ",
    thumbnail: "/portfolio/default-thumbnail.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "https://bunkatu.vercel.app",
    githubUrl: "https://github.com/KoenigWolf/bunkatu.git",
    details: {
      overview: "任意の金額を複数回に分割し、返済スケジュールを可視化するアプリ。",
      features: [
        "支払い回数ごとの計算",
        "支払い予定スケジュールの表示",
        "ダークモード対応"
      ],
      technologies: ["React", "JavaScript", "CSS"],
      challenges: "正確な計算処理の実装と UI の見やすさの向上",
      solutions: "入力値のバリデーションを強化し、適切なフォーマットで表示",
      images: [],
      autoFetchImages: true
    }
  }
];

// =====================================
// ポートフォリオ項目をIDで検索する関数
// =====================================
// この関数は、ポートフォリオ項目のIDを使用して特定のプロジェクトを検索し、
// 見つかった場合はその詳細を返します。
// @param id - 検索するポートフォリオ項目のID
// @returns - 該当するポートフォリオ項目の詳細、または見つからない場合は undefined
export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id);
}

// =====================================
// タグでポートフォリオ項目をフィルタリングする関数
// =====================================
// この関数は、指定したタグを持つポートフォリオ項目をフィルタリングし、
// 結果として一致するアイテムのリストを返します。
// @param tag - フィルタリングするタグ
// @returns - 指定されたタグを持つポートフォリオ項目の配列
export function getPortfolioItemsByTag(tag: string): PortfolioItem[] {
  return portfolioItems.filter(item => item.tags.includes(tag));
}

// =====================================
// すべてのユニークなタグを取得する関数
// =====================================
// この関数は、ポートフォリオ内のすべてのユニークなタグを取得し、
// 重複を排除してリストとして返します。
// @returns - ユニークなタグのリスト
export function getAllPortfolioTags(): string[] {
  const allTags = portfolioItems.flatMap(item => item.tags);
  return [...new Set(allTags)];
}
