// Portfolio データ定義
import type { PortfolioItem } from "@/lib/types/portfolio";

// よく使う共通技術スタック
const commonTech = ["Next.js", "React", "TypeScript", "TailwindCSS"] as const;

// ポートフォリオ生成用ユーティリティ型
type PortfolioInput = Omit<PortfolioItem, "details" | "tags"> & {
  tags?: string[];
  details: Partial<PortfolioItem["details"]>;
};

// ヘルパー関数：デフォルト値を自動補完してポートフォリオを生成
const createPortfolioItem = ({
  id,
  title,
  description,
  thumbnail,
  demoUrl,
  githubUrl,
  tags = [...commonTech],
  details,
}: PortfolioInput): PortfolioItem => ({
  id,
  title,
  description,
  thumbnail,
  tags,
  demoUrl,
  githubUrl,
  details: {
    overview: details.overview ?? description,
    features: details.features ?? [],
    technologies: details.technologies ?? tags,
    challenges: details.challenges ?? "",
    solutions: details.solutions ?? "",
    images: details.images ?? [],
  },
});

// ポートフォリオ一覧
export const portfolioItems: PortfolioItem[] = [
  createPortfolioItem({
    id: "sound",
    title: "周波数を視覚化",
    description: "Web Audio APIを活用したマイク周波数を視覚化するWebアプリ",
    thumbnail: "/portfolio/oto.webp",
    demoUrl: "https://soundtest-seven.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/soundtest.git",
    details: {
      features: [
        "Web Audio APIを活用した音の周波数を取得し波形に視覚化するWebアプリ",
        "レスポンシブデザイン対応",
      ],
    },
  }),

  createPortfolioItem({
    id: "sakura",
    title: "webeditor",
    description: "Webエディター",
    thumbnail: "/portfolio/sakura.webp",
    demoUrl: "https://sakura-editor.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/sakura-editor.git",
    details: {
      features: [
        "Webエディター",
        "レスポンシブデザイン対応",
      ],
    },
  }),

  createPortfolioItem({
    id: "lp-kids",
    title: "留学サービスLP",
    description: "LPの基本構造を汎用的に使用するためのテンプレート",
    thumbnail: "/portfolio/kodomo.webp",
    demoUrl: "https://lp-kodomo.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/lp-kodomo.git",
    details: {
      features: [
        "LPの基本構造を汎用的に使用するためのテンプレート",
        "レスポンシブデザイン対応",
      ],
    },
  }),

  createPortfolioItem({
    id: "zeikin",
    title: "税金計算アプリ",
    description: "所得税や住民税を簡単に計算できるWebアプリケーション",
    thumbnail: "/portfolio/zeikin.webp",
    demoUrl: "https://zeikin.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/zeikin.git",
    details: {
      features: [
        "年収、控除額の入力フォーム",
        "所得税、住民税の自動計算",
        "税額のグラフ表示",
        "レスポンシブデザイン対応",
      ],
      challenges: "税制の複雑な計算ロジックを正確に実装すること。",
      solutions: "公式の税制資料を参照し、計算ロジックを詳細に設計・テスト。",
    },
  }),

  createPortfolioItem({
    id: "vue-clock",
    title: "Vue.js デジタル時計",
    description: "リアルタイムで現在時刻を表示するシンプルなデジタル時計アプリ",
    thumbnail: "/portfolio/clock.webp",
    tags: ["Vue.js", "JavaScript", "CSS"],
    demoUrl: "https://vue-js-clock.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/Vue.js_clock.git",
    details: {
      features: [
        "リアルタイムの時刻表示",
        "12時間/24時間表示の切り替え",
        "カスタムスタイルの適用",
      ],
      challenges: "リアルタイムでの時刻更新とパフォーマンスの最適化",
      solutions: "setInterval による1秒ごとの更新で最適なパフォーマンスを実現",
    },
  }),

  createPortfolioItem({
    id: "bunkatu",
    title: "文章分割ツール",
    description: "指定した文字数でテキストを分割するWebアプリ",
    thumbnail: "/portfolio/bunkatu.webp",
    demoUrl: "https://bunkatu.vercel.app/",
    githubUrl: "https://github.com/KoenigWolf/bunkatu.git",
    details: {
      features: ["テキスト入力＆クリア", "分割サイズ指定", "結果表示"],
      challenges: "文字列操作の効率化とUI最適化",
      solutions: "最適な文字列アルゴリズムとシンプルUIを採用",
    },
  }),
];
