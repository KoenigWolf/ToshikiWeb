# Portfolioサイト

このプロジェクトは、Portfolioサイトです。  
**パフォーマンス、アクセシビリティ、拡張性、保守性** を重視し、実務レベルの基準で設計・実装しています。

---

## 技術スタック

### フロントエンド
- **Next.js 15 (App Router)**  
  SSR / ISR / SSG を適切に使い分け、SEOとパフォーマンスを最適化
- **React 19**  
  最新の React 機能（Server Actions、useOptimistic など）を活用
- **TypeScript**  
  型安全性を確保し、開発時のエラー検出と保守性の向上を実現
- **TailwindCSS**  
  クラスベースのデザインシステムにより迅速な UI 開発を実現
- **shadcn/ui**  
  カスタマイズ可能な UI コンポーネントを効率的に実装
- **Framer Motion**  
  高度なアニメーションで洗練されたユーザー体験を提供
- **NextAuth.js**  
  将来的な認証機能の実装を視野に入れた設計

---

## アーキテクチャと設計思想

### 1. デザインパターン・コンポーネント設計
- **Atomic Design の採用**  
  UI コンポーネントを原子、分子、有機体、テンプレート、ページの階層で整理し、再利用性と保守性を向上
- **関心の分離 (Separation of Concerns)**  
  - **データ取得**: API / Server Actions
  - **状態管理**: React Hooks / Context API
  - **UI レンダリング**: Next.js の Server & Client コンポーネント

### 2. データ管理
- **型安全なデータモデリング**  
  `types.ts` で型定義を行い、エラーを未然に防止
- **データとUIの分離**  
  `lib/data.ts` にデータを一元管理し、コンポーネントは表示に専念
- **ステート管理の最適化**  
  `useState`、`useReducer`、あるいは `React Query` の利用を検討

### 3. パフォーマンス最適化
- **Lazy Load / Code Splitting**  
  `React.lazy()` や Next.js の `dynamic import` を活用して初回ロードを高速化
- **Next.js Image 最適化**  
  `next/image` コンポーネントにより画像を最適化し、遅延読み込みや WebP 変換を適用
- **アニメーションの最適化**  
  Framer Motion の `viewport` 設定で画面外のアニメーションを抑制

---

## 技術選定の理由

### Next.js (App Router)
- **SSR & SSG の両立**: 動的なページは SSR、静的なページは SSG で最適化
- **ルーティング管理の改善**: Layouts、Loading、Error Handling が容易
- **SEO最適化**: メタデータ管理が `generateMetadata()` で一元化

### shadcn/ui
- **カスタマイズ性**: 必要なコンポーネントだけを取り込み、高度なカスタマイズが可能
- **バンドルサイズの削減**: 不要なCSSやJSを排除
- **TailwindCSSとの親和性**: デザインの一貫性を維持

### Framer Motion
- **宣言的なAPI**: 複雑なアニメーションをシンプルに実装
- **パフォーマンス最適化**: GPUアクセラレーションによる滑らかなアニメーション
- **アクセシビリティ対応**: `prefers-reduced-motion` など、ユーザー設定に柔軟に対応

---

## 開発中に直面した課題と解決策

### 1. サーバーとクライアントコンポーネントの分離
**課題**: クライアント専用のフック（useState、useEffect）の使用による SSR エラー  
**解決策**:  
- 状態管理が不要な部分は Server Components で実装
- `dynamic()` を利用し、クライアントコンポーネントとして切り出し

### 2. レスポンシブデザインの最適化
**課題**: 各デバイスに適した UI を提供する必要があった  
**解決策**:  
- TailwindCSS のブレークポイント (`sm`, `md`, `lg`) を活用
- `useMediaQuery` を用いて動的にレイアウト調整

### 3. パフォーマンス最適化
**課題**: 初回読み込み時の JavaScript バンドルサイズの増大  
**解決策**:  
- Tree Shaking を徹底し、不要なライブラリを削除
- `dynamic()` を利用して使用頻度の低いコンポーネントを遅延読み込み

---

## セキュリティとアクセシビリティ

### セキュリティ対策
- **Content Security Policy (CSP)** の適用で XSS 攻撃を防止
- **安全なレンダリング**: React の自動エスケープ機能を活用し、危険な `dangerouslySetInnerHTML` を回避
- **認証・認可**: NextAuth.js の導入を検討

### アクセシビリティ
- **セマンティック HTML**: nav、main、section など適切なタグを使用
- **キーボード操作**: tabindex 設定とフォーカス管理で操作性を向上
- **カラーコントラスト**: WCAG AA レベルの基準を遵守

---

## 今後の展望
- **多言語対応 (i18n)**: `next-intl` などを用い、日本語と英語の切替を実装予定
- **フォーム機能の追加**: React Hook Form によるバリデーション付きコンタクトフォームの実装
- **サーバー連携の強化**: Next.js API Routes や GraphQL の導入でデータ連携を拡充
- **ブログ機能の追加**: Markdown/MDX 対応の技術記事公開プラットフォームを構築予定

---

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/portfolio.git

# 依存関係のインストール
cd portfolio
npm install

# 開発サーバーの起動
npm run dev
```

## ビルドと本番デプロイ

```bash
# 本番用ビルド
npm run build

# ビルド結果の確認
npm run start
```
