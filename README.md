# 🎨 Portfolioサイト

このプロジェクトは、モダンなフロントエンド技術を駆使した**Portfolioサイト**です。  
**パフォーマンス・アクセシビリティ・拡張性・保守性** を重視し、実務レベルの基準で設計・実装しています。

---

## 📌 サイトマップ

本サイトのページ構成は以下の通りです。

```
/
├── /about          # 自己紹介ページ
├── /portfolio      # 作品一覧ページ
├── /portfolio/[id] # 作品詳細ページ
└── /contact        # お問い合わせページ
```

### 各ページの役割
- **ホームページ**：サイト全体の概要、重要な情報への導線
- **自己紹介**：経歴、スキル、資格などの詳細情報
- **作品一覧**：制作したプロジェクトの全体リスト
- **作品詳細**：個別プロジェクトの詳細説明と使用技術
- **お問い合わせ**：連絡フォームと連絡先情報

---

## 🏗️ 技術スタック

### フロントエンド
- **Next.js 15 (App Router)**：SSR / ISR / SSG を適切に使い分け、SEOとパフォーマンスを最適化
- **React 19**：最新の React 機能（Server Actions、useOptimistic など）を活用
- **TypeScript**：型安全性を確保し、開発時のエラー検出と保守性の向上を実現
- **TailwindCSS**：クラスベースのデザインシステムにより迅速な UI 開発を実現
- **shadcn/ui**：カスタマイズ可能な UI コンポーネントを効率的に実装
- **Framer Motion**：高度なアニメーションで洗練されたユーザー体験を提供
- **NextAuth.js**：将来的な認証機能の実装を視野に入れた設計

---

## 🏛️ アーキテクチャと設計思想

### 1. デザインパターン・コンポーネント設計
✅ **Atomic Designの適用**
  - **atoms**：ボタン、見出し、アイコンなどの基本コンポーネント
  - **molecules**：フォーム入力欄やカードなど、小さなUI要素の組み合わせ
  - **organisms**：ヘッダーやフッター、ポートフォリオリストなど、大きなUI構成要素
  - **templates**：各ページの基本的なレイアウト
  - **pages**：最終的にレンダリングされるページコンポーネント

✅ **関心の分離 (Separation of Concerns)**
  - **データ取得**：API / Server Actions
  - **状態管理**：React Hooks / Context API
  - **UIレンダリング**：Next.js の Server & Client コンポーネント

---

## 🚀 パフォーマンス最適化

✅ **Lazy Load / Code Splitting**
  - `React.lazy()` や Next.js の `dynamic import` を活用して初回ロードを高速化

✅ **Next.js Image最適化**
  - `next/image` コンポーネントにより画像を最適化し、遅延読み込みや WebP 変換を適用

✅ **アニメーションの最適化**
  - Framer Motion の `viewport` 設定で画面外のアニメーションを抑制

✅ **バンドルサイズの削減**
  - 不要なライブラリを排除し、`tree shaking` を徹底

---

## 🔧 技術選定の理由

### Next.js (App Router)
- **SSR & SSG の両立**：動的なページは SSR、静的なページは SSG で最適化
- **ルーティング管理の改善**：Layouts、Loading、Error Handling が容易
- **SEO最適化**：メタデータ管理が `generateMetadata()` で一元化

### shadcn/ui
- **カスタマイズ性**：必要なコンポーネントだけを取り込み、高度なカスタマイズが可能
- **バンドルサイズの削減**：不要なCSSやJSを排除
- **TailwindCSSとの親和性**：デザインの一貫性を維持

### Framer Motion
- **宣言的なAPI**：複雑なアニメーションをシンプルに実装
- **パフォーマンス最適化**：GPUアクセラレーションによる滑らかなアニメーション
- **アクセシビリティ対応**：`prefers-reduced-motion` など、ユーザー設定に柔軟に対応

---

## 🔍 開発中に直面した課題と解決策

### 1. サーバーとクライアントコンポーネントの分離
**課題**：クライアント専用のフック（useState、useEffect）の使用による SSR エラー  
**解決策**：
- 状態管理が不要な部分は **Server Components** で実装
- `dynamic()` を利用し、クライアントコンポーネントとして切り出し

### 2. レスポンシブデザインの最適化
**課題**：各デバイスに適した UI を提供する必要があった  
**解決策**：
- TailwindCSS のブレークポイント (`sm`, `md`, `lg`) を活用
- `useMediaQuery` を用いて動的にレイアウト調整

### 3. 初回読み込み時の JavaScript バンドルサイズの増大
**課題**：ページのレンダリングが遅くなるリスク  
**解決策**：
- `dynamic()` を活用して使用頻度の低いコンポーネントを遅延読み込み
- `React.lazy()` によりコンポーネントの分割を最適化

---

## 🔒 セキュリティとアクセシビリティ

### ✅ セキュリティ対策
- **Content Security Policy (CSP)** の適用で XSS 攻撃を防止
- **安全なレンダリング**：React の自動エスケープ機能を活用し、`dangerouslySetInnerHTML` を回避

### ✅ アクセシビリティ
- **セマンティック HTML**：nav、main、section など適切なタグを使用
- **キーボード操作**：tabindex 設定とフォーカス管理で操作性を向上
- **カラーコントラスト**：WCAG AA レベルの基準を遵守

---

## 📄 ライセンス

このプロジェクトは **MIT ライセンス** の下で公開されています。

