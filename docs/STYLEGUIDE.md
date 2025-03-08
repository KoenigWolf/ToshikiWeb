# スタイルガイド

このスタイルガイドは、プロジェクト全体で一貫したデザインとユーザーエクスペリエンスを確保するための基準を定義します。

## 目次

- [デザイン原則](#デザイン原則)
- [色彩](#色彩)
- [タイポグラフィ](#タイポグラフィ)
- [スペーシング](#スペーシング)
- [コンポーネント](#コンポーネント)
- [アニメーション](#アニメーション)
- [アイコンと画像](#アイコンと画像)
- [レスポンシブデザイン](#レスポンシブデザイン)

## デザイン原則

当プロジェクトのデザインは以下の原則に基づいています：

1. **シンプリシティ**: 必要最小限の要素で最大の効果を得る
2. **一貫性**: 同様の問題には同様の解決策を適用する
3. **アクセシビリティ**: すべてのユーザーにとって使いやすくする
4. **目的性**: 各デザイン要素は明確な目的を持つ
5. **コンテキスト**: ユーザーの文脈に合わせたデザインを提供する

## 色彩

### 基本色

| 色名       | Hex 値                | 使用場所                               |
| ---------- | --------------------- | -------------------------------------- |
| Primary    | `#1E40AF`             | ボタン、リンク、強調要素               |
| Secondary  | `#6B7280`             | 補助的なアクション、セカンダリテキスト |
| Accent     | `#3B82F6`             | 特別な強調、フォーカス状態             |
| Background | `#FFFFFF` / `#F9FAFB` | ページ背景、カード背景                 |
| Text       | `#111827` / `#374151` | 本文、見出し                           |

### 意味的な色

| 色名    | Hex 値    | 使用場所                         |
| ------- | --------- | -------------------------------- |
| Success | `#10B981` | 成功メッセージ、完了状態         |
| Warning | `#F59E0B` | 警告、注意喚起                   |
| Error   | `#EF4444` | エラーメッセージ、重要なアラート |
| Info    | `#3B82F6` | 情報通知                         |

### ダークモード

ダークモードでは明度と彩度を調整し、コントラスト比を保ちながら目の疲れを軽減します。

| 色名       | ライトモード | ダークモード |
| ---------- | ------------ | ------------ |
| Background | `#FFFFFF`    | `#111827`    |
| Text       | `#111827`    | `#F9FAFB`    |
| Card       | `#F9FAFB`    | `#1F2937`    |
| Border     | `#E5E7EB`    | `#374151`    |

## タイポグラフィ

### フォントファミリー

- **見出し**: `Inter`, sans-serif
- **本文**: `Inter`, sans-serif
- **コード**: `JetBrains Mono`, monospace

### フォントサイズ

| 用途       | サイズ (rem/px) | ウェイト | 行間 |
| ---------- | --------------- | -------- | ---- |
| h1         | 2.25rem (36px)  | 800      | 1.2  |
| h2         | 1.875rem (30px) | 700      | 1.25 |
| h3         | 1.5rem (24px)   | 600      | 1.3  |
| h4         | 1.25rem (20px)  | 600      | 1.4  |
| 本文（大） | 1.125rem (18px) | 400      | 1.5  |
| 本文       | 1rem (16px)     | 400      | 1.6  |
| 本文（小） | 0.875rem (14px) | 400      | 1.6  |
| 微小       | 0.75rem (12px)  | 400      | 1.5  |

TailwindCSS のクラス例：

```html
<!-- 見出し1 -->
<h1 class="text-4xl font-extrabold leading-tight">見出し1</h1>

<!-- 本文 -->
<p class="text-base leading-relaxed">本文テキスト</p>
```

## スペーシング

一貫したスペーシングシステムを使用して、UI 全体の調和を維持します。基本単位は 0.25rem（4px）です。

### マージンとパディング

| 名前 | サイズ (rem/px) | TailwindCSS クラス | 使用場所             |
| ---- | --------------- | ------------------ | -------------------- |
| xs   | 0.25rem (4px)   | p-1, m-1           | 非常に小さな間隔     |
| sm   | 0.5rem (8px)    | p-2, m-2           | コンパクトな要素間   |
| md   | 1rem (16px)     | p-4, m-4           | 標準的な間隔         |
| lg   | 1.5rem (24px)   | p-6, m-6           | 関連要素のグループ間 |
| xl   | 2rem (32px)     | p-8, m-8           | セクション間         |
| 2xl  | 3rem (48px)     | p-12, m-12         | 主要セクション間     |

### レイアウトとグリッド

コンテナの最大幅：

- モバイル: 100%
- タブレット: 100%
- デスクトップ: 1280px

グリッドガター（列間の間隔）：

- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)

## コンポーネント

各コンポーネントは Atomic デザインパターンに従い、一貫したスタイルを持ちます。

### ボタン

```html
<!-- プライマリボタン -->
<button
  class="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
>
  プライマリ
</button>

<!-- セカンダリボタン -->
<button
  class="px-4 py-2 font-medium text-primary bg-white border border-primary rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
>
  セカンダリ
</button>
```

サイズバリエーション：

- sm: px-3 py-1 text-sm
- md: px-4 py-2 text-base
- lg: px-6 py-3 text-lg

### カード

```html
<div class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div class="px-6 py-4">
    <h3 class="text-xl font-semibold">カードタイトル</h3>
    <p class="mt-2 text-gray-600 dark:text-gray-300">カードの内容...</p>
  </div>
  <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700">
    <button class="text-primary">アクション</button>
  </div>
</div>
```

### フォーム要素

```html
<!-- テキスト入力 -->
<div>
  <label
    for="name"
    class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >名前</label
  >
  <input
    type="text"
    id="name"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
    placeholder="名前を入力"
  />
</div>
```

## アニメーション

### トランジション

基本的なトランジション：

- 持続時間: 150ms-300ms
- イージング: ease-in-out, ease-out

```html
<button class="transition duration-200 ease-in-out transform hover:scale-105">
  ホバーでスケール
</button>
```

### アニメーションバリアント（Framer Motion）

```typescript
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
```

## アイコンと画像

### アイコン

- 基本サイズ: 24px × 24px
- 線の太さ: 1.5px (ストロークアイコンの場合)
- アイコンライブラリ: Lucide-React

```html
<Icon className="w-6 h-6 text-gray-500" />
```

### 画像

- 画像は常に`next/image`コンポーネントを使用
- アスペクト比を維持
- 適切な alt 属性を設定
- 遅延読み込み（ただし、重要な画像を除く）

```jsx
<Image
  src="/images/example.jpg"
  alt="説明的なテキスト"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

## レスポンシブデザイン

モバイルファーストアプローチを採用し、以下のブレークポイントで設計します：

| 名前 | 最小幅 | TailwindCSS プレフィックス |
| ---- | ------ | -------------------------- |
| sm   | 640px  | sm:                        |
| md   | 768px  | md:                        |
| lg   | 1024px | lg:                        |
| xl   | 1280px | xl:                        |
| 2xl  | 1536px | 2xl:                       |

レスポンシブデザインの原則：

1. モバイルレイアウトを最初に設計
2. 大きな画面に合わせてレイアウトを拡張
3. コンテンツの優先順位を考慮したレイアウト調整
4. ブレークポイントに基づくフォントサイズの調整

```html
<div
  class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
  <!-- カードアイテム -->
</div>
```

---

このスタイルガイドは継続的に更新され、新しいコンポーネントやパターンが追加されます。チームメンバーは変更の提案や質問がある場合、Issue を作成してください。
