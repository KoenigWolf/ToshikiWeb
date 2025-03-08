# [🎨 Portfolio サイト](https://toshiki-web.vercel.app/)

このプロジェクトは、モダンなフロントエンド技術を駆使した**Portfolio サイト**です。  
**パフォーマンス・アクセシビリティ・拡張性・保守性** を重視し、実務レベルの基準で設計・実装しています。

![Portfolioサイトのスクリーンショット](/public/portfolio/portfolio-screenshot.webp)

---

## 📚 目次

- [📌 サイトマップ](#-サイトマップ)
- [🏗️ 技術スタック](#-技術スタック)
- [🧩 プロジェクト構造](#-プロジェクト構造)
- [🏛️ アーキテクチャと設計思想](#-アーキテクチャと設計思想)
- [🚀 パフォーマンス最適化](#-パフォーマンス最適化)
- [🔧 技術選定の理由](#-技術選定の理由)
- [🧠 主要機能の実装詳細](#-主要機能の実装詳細)
- [🔍 開発中に直面した課題と解決策](#-開発中に直面した課題と解決策)
- [🔒 セキュリティとアクセシビリティ](#-セキュリティとアクセシビリティ)
- [🛠️ 開発環境のセットアップ](#-開発環境のセットアップ)
- [📝 コーディング規約](#-コーディング規約)
- [📄 ライセンス](#-ライセンス)
- [📑 プロジェクトドキュメント](#-プロジェクトドキュメント)

---

## 📌 サイトマップ

本サイトのページ構成は以下の通りです。

```
/
├── /about          # 自己紹介ページ
├── /skills         # スキル詳細ページ
│   └── /[category] # カテゴリ別スキル
├── /experience     # 経験・実績ページ
│   └── /[id]       # 個別経験詳細
├── /portfolio      # 作品一覧ページ
│   └── /[id]       # 作品詳細ページ
└── /certifications # 資格一覧ページ
    └── /[id]       # 個別資格詳細
```

### 各ページの役割

- **ホームページ（/）**：

  - サイト全体の概要と主要セクションへのナビゲーション
  - 各セクション（経験、スキル、ポートフォリオ、資格など）のハイライト表示
  - クリーンでモダンな UI による第一印象の最適化

- **自己紹介（/about）**：

  - 経歴、スキル、資格などの詳細情報
  - プロフェッショナルとしての自己アピール

- **スキルページ（/skills）**：

  - フロントエンド、バックエンド、クラウドなどカテゴリ別のスキル一覧
  - 各スキルの習熟度と経験年数の可視化

- **経験・実績（/experience）**：

  - 職務経歴と実務プロジェクト一覧
  - 各経験での役割、技術スタック、成果の詳細説明

- **作品一覧（/portfolio）**：

  - 制作したプロジェクトの全体リスト
  - タグによるフィルタリング機能
  - プロジェクトのサムネイルとハイライト表示

- **作品詳細（/portfolio/[id]）**：

  - 個別プロジェクトの詳細説明
  - 使用技術、課題と解決策、成果の説明
  - GitHub リポジトリやデモサイトへのリンク

- **資格一覧（/certifications）**：
  - 取得資格や認定情報の一覧
  - 各資格の取得日、スコア、関連スキルの表示

---

## 🏗️ 技術スタック

### フロントエンド

- **Next.js 15 (App Router)**：SSR / ISR / SSG を適切に使い分け、SEO とパフォーマンスを最適化
- **React 19**：最新の React 機能（Server Actions、useOptimistic など）を活用
- **TypeScript**：型安全性を確保し、開発時のエラー検出と保守性の向上を実現
- **TailwindCSS 4**：クラスベースのデザインシステムにより迅速な UI 開発を実現
- **shadcn/ui**：カスタマイズ可能な UI コンポーネントを効率的に実装
- **Framer Motion**：高度なアニメーションで洗練されたユーザー体験を提供
- **Radix UI**：アクセシブルなプリミティブコンポーネントを使用

### ツールとユーティリティ

- **ESLint 9**：コード品質とスタイルの一貫性を維持
- **TypeScript 5**：厳格な型チェックによる安全なコード開発
- **Lucide Icons**：美しくカスタマイズ可能な SVG アイコンセット
- **clsx & tailwind-merge**：条件付きクラス名の効率的な管理

---

## 🧩 プロジェクト構造

プロジェクトは以下のディレクトリ構造に基づいて整理されています：

```
src/
├── app/                  # Next.js App Router のページ定義
│   ├── about/            # 自己紹介ページ
│   ├── certifications/   # 資格ページ
│   ├── experience/       # 経験ページ
│   ├── portfolio/        # ポートフォリオページ
│   ├── skills/           # スキルページ
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # ホームページ
│
├── components/           # Atomic Design に基づくコンポーネント
│   ├── atoms/            # 基本的なUI要素（ボタン、バッジなど）
│   ├── molecules/        # 複数のatomsで構成される複合コンポーネント
│   ├── organisms/        # 完全な機能を持つ大きなコンポーネント
│   └── ui/               # shadcn/ui コンポーネント
│
├── lib/                  # 共有ライブラリとユーティリティ関数
│   ├── utils/            # 機能別に分割されたユーティリティ関数
│   │   ├── date.ts       # 日付処理ユーティリティ
│   │   ├── github.ts     # GitHub API連携ユーティリティ
│   │   ├── ui.ts         # UI関連ユーティリティ
│   │   └── index.ts      # エクスポート集約
│   ├── data.ts           # データエクスポート（後方互換性用）
│   ├── portfolio.ts      # ポートフォリオ関連データと関数
│   ├── profile.ts        # プロフィール関連データと関数
│   ├── projects.ts       # プロジェクト関連データと関数
│   └── types.ts          # 共有型定義
│
└── public/               # 静的アセット（画像、フォントなど）
    └── portfolio/        # ポートフォリオ画像
```

---

## 🏛️ アーキテクチャと設計思想

### 1. Atomic Design パターン

プロジェクトは Atomic Design の原則に従って構造化されており、コンポーネントは以下のカテゴリに分類されています。

✅ **atoms**（原子）

- 最小単位の UI 要素：ボタン、バッジ、アイコン
- 例：`BackButton`, `TechnologyBadge`, `ViewAllButton`
- 責務：単一の明確な機能を持ち、他のコンポーネントに依存しない

✅ **molecules**（分子）

- 複数のアトムを組み合わせた小さな機能ユニット
- 例：`ProjectLinks`, `FeaturesList`, `SectionTitle`
- 責務：特定のユースケースのための機能グループを形成

✅ **organisms**（有機体）

- 複数の分子とアトムが組み合わさった完全な機能を持つ UI 部品
- 例：`PortfolioGrid`, `PortfolioDetail`, `Header`, `Footer`
- 責務：ページの主要セクションを形成し、独立して機能する

### 2. 関心の分離 (Separation of Concerns)

コードは明確な責務に基づいて分離されています。

✅ **データ層**

- 静的データ：`lib/portfolio.ts`, `lib/profile.ts`, `lib/projects.ts`
- データアクセス：各種データ取得・フィルタリング関数

✅ **プレゼンテーション層**

- UI コンポーネント：`components/` ディレクトリ内の各コンポーネント
- スタイリング：TailwindCSS クラスによるコンポーネント内スタイリング

✅ **ルーティング層**

- Next.js App Router を使用したファイルベースのルーティング
- 動的ルート（`[id]`）によるパラメータ化されたページ

### 3. 再利用性と保守性

✅ **共通コンポーネントの抽出**

- 複数の場所で使用される UI パターンを共通コンポーネントとして実装
- 一貫したデザイン言語とユーザー体験の提供

✅ **型駆動開発**

- TypeScript インターフェースとタイプの徹底使用
- 厳格な型チェックによるエラー防止と自己ドキュメント化

✅ **JSDoc コメント**

- 各コンポーネントと関数に詳細な説明と使用例を記述
- パラメータと戻り値の型情報を明示

---

## 🚀 パフォーマンス最適化

### 1. レンダリング戦略の最適化

✅ **適切なレンダリング方式の選択**

- 静的コンテンツ：Static Site Generation (SSG)
- 動的コンテンツ：Server-Side Rendering (SSR)
- ユーザーインタラクション：Client-Side Rendering (CSR)

✅ **Server Components と Client Components の使い分け**

- `"use client"` ディレクティブの最小限の使用
- 状態管理が必要なコンポーネントのみをクライアントコンポーネントとして実装

### 2. 画像最適化

✅ **Next.js Image コンポーネント**

- 自動サイズ最適化と WebP フォーマットへの変換
- 遅延読み込み (Lazy Loading) の適用
- プロパティサイズの明示的指定

✅ **効率的な画像リソース管理**

- サイズ別の画像バリアント（モバイル、タブレット、デスクトップ）
- 適切な画像圧縮とフォーマット選択

### 3. コード最適化

✅ **コード分割と遅延読み込み**

- `dynamic import` による必要に応じたコンポーネント読み込み
- 初期ロード時の JavaScript バンドルサイズの削減

✅ **アニメーションの最適化**

- Framer Motion の `viewport` 設定による画面外アニメーションの無効化
- CSS トランジションと JavaScript アニメーションの適切な使い分け

✅ **バンドルサイズの削減**

- 未使用コードの削除 (Tree Shaking)
- 依存ライブラリの慎重な選択と使用

### 4. メモ化と再計算の最適化

✅ **効率的なデータアクセス**

- 重複計算の防止と結果のキャッシュ
- フィルタリングや並べ替えロジックの最適化

---

## 🔧 技術選定の理由

### Next.js (App Router)

- **ページレンダリングの柔軟性**：静的生成と動的レンダリングを状況に応じて選択可能
- **最新の React 機能サポート**：React Server Components、Suspense などをすぐに活用可能
- **パフォーマンス最適化**：自動画像最適化、フォント最適化、スクリプト最適化
- **SEO 対応**：メタデータ管理、Sitemap 生成、Robots.txt 対応
- **簡潔な API**：複雑なルーティング設定なしに高度な機能を実装可能

### TailwindCSS

- **生産性の向上**：HTML 内でスタイルを直接管理し、コンテキストスイッチを減少
- **一貫性の確保**：事前に設定されたデザイントークンによる統一された外観
- **パフォーマンス**：未使用 CSS の自動削除による最小限の CSS ファイルサイズ
- **レスポンシブデザインの簡素化**：ブレークポイント用のユーティリティクラス
- **ダークモード対応**：`dark:` バリアントによる簡単な切り替え

### shadcn/ui

- **カスタマイズ性**：コピーペーストベースのコンポーネントでソースコードの完全制御が可能
- **アクセシビリティ**：WAI-ARIA 標準に従った設計
- **テーマのカスタマイズ**：CSS 変数を通じた容易なスタイル調整
- **軽量性**：必要なコンポーネントのみをインポートできるため、無駄がない
- **TailwindCSS との相性**：同じ設計哲学を共有

### Framer Motion

- **宣言的 API**：複雑なアニメーションシーケンスを簡潔に記述可能
- **ジェスチャーサポート**：タッチ、ドラッグ、ホバーなどのインタラクションに対応
- **アクセシビリティ考慮**：`prefers-reduced-motion` メディアクエリへの対応
- **パフォーマンス**：GPU アクセラレーションと最適化されたアニメーションエンジン
- **TypeScript 対応**：型安全性の確保

---

## 🧠 主要機能の実装詳細

### 1. ポートフォリオ機能

✅ **ポートフォリオ一覧表示**

- 作品一覧をグリッドレイアウトで表示
- タグによるフィルタリング機能
- アニメーションによる洗練された表示効果
- 「すべての作品を見る」ボタンによるポートフォリオページへの誘導

✅ **ポートフォリオ詳細表示**

- 各プロジェクトの詳細情報（概要、使用技術、機能、課題と解決策）
- 複数画像のスライダー表示
- GitHub とデモサイトへのリンクボタン
- 技術タグの表示

### 2. プロフィールと経験

✅ **自己紹介セクション**

- ヒーローセクションによる簡潔な自己紹介
- 経歴、スキル、職歴のハイライト表示
- アバターと連絡先情報

✅ **経験（実務経験）セクション**

- 時系列での経歴表示
- 各プロジェクトでの役割と責任の説明
- 使用技術と成果の詳細

### 3. スキルと資格

✅ **スキルセクション**

- カテゴリ別のスキル一覧（フロントエンド、バックエンド、クラウドなど）
- 習熟度の可視化
- 関連プロジェクトへのリンク

✅ **資格セクション**

- 取得資格のリスト表示
- 取得日と詳細情報
- 関連スキルとの関連付け

### 4. UI/UX 機能

✅ **レスポンシブデザイン**

- モバイル、タブレット、デスクトップ向けのレイアウト最適化
- フレキシブルなグリッドシステムの使用

✅ **アニメーションとトランジション**

- ページ遷移アニメーション
- スクロールトリガーアニメーション
- インタラクティブな要素のフィードバック

✅ **ダークモード対応**

- システム設定に基づく自動切り替え
- ダークモード専用の色彩設計

---

## 🔍 開発中に直面した課題と解決策

### 1. サーバーとクライアントコンポーネントの分離

**課題**：クライアント専用のフック（useState、useEffect）の使用による SSR エラー  
**解決策**：

- 状態管理が不要な部分は **Server Components** で実装
- `"use client"` ディレクティブを必要なコンポーネントの先頭に追加
- データ取得とレンダリングを分離し、効率的なコンポーネント設計を実現

### 2. レスポンシブデザインの最適化

**課題**：各デバイスに適した UI を提供する必要があった  
**解決策**：

- TailwindCSS のブレークポイント (`sm`, `md`, `lg`) を活用
- コンポーネントの再利用性を高めるためのプロパティ設計
- モバイルファーストアプローチの採用

### 3. 初回読み込み時の JavaScript バンドルサイズの増大

**課題**：ページのレンダリングが遅くなるリスク  
**解決策**：

- 必要なページでのみ必要なコンポーネントを読み込む設計
- クライアントコンポーネントの最小化
- 大きなライブラリの選択的インポート

### 4. コードの重複と保守性の課題

**課題**：類似機能を持つコンポーネントの重複が発生  
**解決策**：

- 共通コンポーネントの抽出と再利用
- プロパティによる柔軟なカスタマイズ
- ユーティリティ関数の機能別モジュール化

### 5. データの管理と構造化

**課題**：プロジェクトデータを効率的に管理する必要性  
**解決策**：

- 各データ種別（portfolio, profile, projects）ごとのモジュール化
- 型定義による安全性の確保
- データアクセス関数の実装（フィルター、ソート、検索）

---

## 🔒 セキュリティとアクセシビリティ

### ✅ セキュリティ対策

- **入力値の検証と消毒**：ユーザー入力の適切な処理
- **適切なリンク管理**：外部リンクには `rel="noopener noreferrer"` を設定
- **画像のセキュリティ**：Next.js Image コンポーネントによる安全な画像表示

### ✅ アクセシビリティ

- **セマンティック HTML**：適切な HTML タグ（section, article, nav, header, footer）の使用
- **ARIA 属性**：スクリーンリーダー対応のための適切な属性設定
- **キーボードナビゲーション**：すべての機能がキーボードで操作可能
- **コントラスト比**：WCAG AA レベルを満たすコントラスト比
- **フォーカス管理**：インタラクティブ要素の明確なフォーカス状態

---

## 🛠️ 開発環境のセットアップ

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

### インストール手順

1. リポジトリのクローン:

```bash
git clone https://github.com/username/portfolio-site.git
cd portfolio-site
```

2. 依存関係のインストール:

```bash
npm install
```

3. 開発サーバーの起動:

```bash
npm run dev
```

4. ビルドと本番モード実行:

```bash
npm run build
npm start
```

### 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動 (Turbopack を使用)
- `npm run build` - 本番用ビルドを生成
- `npm run start` - 本番ビルドを実行
- `npm run lint` - ESLint によるコード品質チェック

---

## 📝 コーディング規約

### コンポーネント構造

- 各コンポーネントは Atmic Design パターンに従って配置
- コンポーネントは単一責任の原則に従う
- 状態管理が必要なコンポーネントのみ `"use client"` ディレクティブを使用

### 命名規則

- コンポーネント: PascalCase (例: `PortfolioGrid`, `TechnologyBadge`)
- 関数: camelCase (例: `getPortfolioItemById`, `formatDate`)
- ファイル: タイプ別の規則
  - コンポーネント: PascalCase (例: `PortfolioGrid.tsx`)
  - ユーティリティ: camelCase (例: `utils.ts`, `github.ts`)

### スタイリング

- TailwindCSS クラスを直接使用
- 条件付きクラスには `clsx` および `cn()` ユーティリティを使用
- 主要なデザイントークンは Tailwind の設定で一元管理

### TypeScript

- すべてのコンポーネントに Interface または Type で型を定義
- 共通型は `types.ts` で一元管理
- プロパティには詳細な JSDoc コメントを追加

---

## 📄 ライセンス

このプロジェクトは **MIT ライセンス** の下で公開されています。詳細については [LICENSE](LICENSE) ファイルを参照してください。

---

## 📑 プロジェクトドキュメント

チーム開発をサポートするための詳細なドキュメントを `docs/` ディレクトリに用意しています。

### ドキュメント一覧

| ドキュメント                                         | 説明                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| [設計思想と開発規則](./docs/DESIGN.md)               | プロジェクトの設計原則、アーキテクチャ、コンポーネント設計、コーディング規約 |
| [変更履歴](./docs/CHANGELOG.md)                      | バージョンごとの変更内容と追加機能の記録                                     |
| [コントリビューションガイド](./docs/CONTRIBUTING.md) | プロジェクトへの貢献方法と開発プロセス                                       |
| [行動規範](./docs/CODE_OF_CONDUCT.md)                | プロジェクト参加者の行動規範                                                 |
| [スタイルガイド](./docs/STYLEGUIDE.md)               | UI/UX デザインの一貫性を保つためのガイドライン                               |
| [テスト戦略](./docs/TESTING.md)                      | テスト手法、テストツール、テストプロセスの定義                               |

チーム開発における設計思想の一貫性を保ち、効率的な協業を実現するために、これらのドキュメントを参照してください。ドキュメントは継続的に更新され、プロジェクトの進化に合わせて最新の情報を提供します。

---

## 👤 作者

**Toshiki**

- [GitHub](https://github.com/KoenigWolf)
- [メール](mailto:creatorsoasis@outlook.com)
