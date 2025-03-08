# テスト戦略

このドキュメントはプロジェクトのテスト戦略を定義し、品質を確保するためのベストプラクティスを提供します。

## 目次

- [テスト原則](#テスト原則)
- [テストタイプ](#テストタイプ)
- [テストツール](#テストツール)
- [テスト環境](#テスト環境)
- [テストプロセス](#テストプロセス)
- [テストカバレッジ](#テストカバレッジ)
- [テスト自動化](#テスト自動化)
- [パフォーマンステスト](#パフォーマンステスト)
- [アクセシビリティテスト](#アクセシビリティテスト)

## テスト原則

1. **早期テスト**: 開発サイクルの早い段階でテストを開始する
2. **継続的テスト**: CI/CD パイプラインでの自動テスト実行
3. **責任の共有**: 品質はチーム全体の責任
4. **リスクベースアプローチ**: 高リスク領域に重点を置く
5. **テスト自動化**: 繰り返し行うテストは自動化する

## テストタイプ

### 1. 単体テスト (Unit Tests)

- **目的**: 個別のコンポーネントや関数が期待通りに動作することを確認
- **範囲**: ユーティリティ関数、カスタムフック、UI コンポーネント
- **ツール**: Jest, React Testing Library

```typescript
// ユーティリティ関数のテスト例
import { formatDate } from "@/lib/utils";

describe("formatDate", () => {
  it("formats date correctly", () => {
    const date = new Date("2023-01-01T12:00:00Z");
    expect(formatDate(date)).toBe("2023年1月1日");
  });

  it("returns empty string for invalid date", () => {
    expect(formatDate(null)).toBe("");
  });
});
```

### 2. インテグレーションテスト (Integration Tests)

- **目的**: 複数のコンポーネントや機能が連携して正しく動作することを確認
- **範囲**: フォーム送信、API 連携、状態管理
- **ツール**: React Testing Library, MSW (Mock Service Worker)

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  it("submits form with user input", async () => {
    const mockSubmit = jest.fn();

    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText("名前"), {
      target: { value: "テスト太郎" },
    });
    fireEvent.change(screen.getByLabelText("メール"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "送信" }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "テスト太郎",
        email: "test@example.com",
      });
    });
  });
});
```

### 3. エンドツーエンドテスト (E2E Tests)

- **目的**: 実際のユーザー体験をシミュレートし、全体的なフローが正しく動作することを確認
- **範囲**: クリティカルなユーザーフロー（ナビゲーション、ページ遷移、フォーム送信など）
- **ツール**: Playwright または Cypress

```typescript
// Playwrightを使用したE2Eテスト例
test("user can navigate to portfolio and view details", async ({ page }) => {
  // ホームページにアクセス
  await page.goto("/");

  // ポートフォリオリンクをクリック
  await page.click('a[href="/portfolio"]');

  // ポートフォリオページにリダイレクトされる
  await expect(page).toHaveURL("/portfolio");

  // プロジェクトカードをクリック
  await page.click(".project-card:first-child");

  // プロジェクト詳細ページに移動
  await expect(page).toHaveURL(/\/portfolio\/\d+/);

  // プロジェクト詳細が表示される
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".project-description")).toBeVisible();
});
```

## テストツール

以下のツールを使用してテストを実施します：

| ツール                | 用途                                 | 設定ファイル              |
| --------------------- | ------------------------------------ | ------------------------- |
| Jest                  | 単体テスト、インテグレーションテスト | `jest.config.js`          |
| React Testing Library | コンポーネントテスト                 | Jest と併用               |
| MSW                   | API モック                           | `src/mocks/handlers.ts`   |
| Playwright            | E2E テスト                           | `playwright.config.ts`    |
| Storybook             | コンポーネントの視覚的テスト         | `.storybook/`             |
| Axe                   | アクセシビリティテスト               | Jest や Playwright と併用 |
| Lighthouse            | パフォーマンステスト                 | CI パイプラインで実行     |

## テスト環境

| 環境         | 用途           | URL                           |
| ------------ | -------------- | ----------------------------- |
| ローカル     | 開発中のテスト | `http://localhost:3000`       |
| 開発環境     | 統合テスト     | `https://dev.example.com`     |
| ステージング | E2E テスト     | `https://staging.example.com` |
| 本番環境     | 本番確認       | `https://www.example.com`     |

## テストプロセス

### 開発前

1. テスト可能な要件定義
2. テスト計画の作成
3. テスト基準の定義

### 開発中

1. TDD（テスト駆動開発）アプローチ
2. コードレビュー時のテストコードレビュー
3. CI での自動テスト実行

### リリース前

1. 回帰テスト
2. E2E テスト
3. パフォーマンステスト
4. アクセシビリティテスト

## テストカバレッジ

- **目標**: 最低 80% のコードカバレッジ
- **重点領域**: ビジネスロジック、データ変換、状態管理
- **除外領域**: 外部ライブラリのラッパー、純粋な表示コンポーネント

カバレッジレポートは CI パイプラインで自動生成され、レビューされます。

```bash
# カバレッジレポートの生成
npm run test:coverage
```

## テスト自動化

### CI/CD パイプライン

```yaml
# GitHub Actions ワークフロー例
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Unit and Integration Tests
        run: npm run test
      - name: E2E Tests
        run: npm run test:e2e
      - name: Upload coverage
        uses: coverallsapp/github-action@v2
```

## パフォーマンステスト

### コア Web バイタル

- **LCP (Largest Contentful Paint)**: 目標 < 2.5 秒
- **FID (First Input Delay)**: 目標 < 100ms
- **CLS (Cumulative Layout Shift)**: 目標 < 0.1

### テストツール

- Lighthouse CI
- Web Vitals ライブラリを使用した実ユーザーモニタリング (RUM)
- WebPageTest によるパフォーマンス測定

## アクセシビリティテスト

### 自動テスト

- **jest-axe**: 単体テストでのアクセシビリティチェック
- **@axe-core/playwright**: E2E テストでのアクセシビリティチェック

```typescript
// Jest と Axe を使用したアクセシビリティテスト例
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "@/components/atoms/Button";

expect.extend(toHaveNoViolations);

it("should have no accessibility violations", async () => {
  const { container } = render(<Button>テスト</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 手動テスト

- スクリーンリーダーテスト (NVDA, VoiceOver)
- キーボードナビゲーションテスト
- ハイコントラストモードテスト
- 拡大表示テスト

---

このテスト戦略ドキュメントは、プロジェクトの進行に合わせて定期的に見直し、更新します。テストに関する質問や提案がある場合は、Issue を作成するか、チームミーティングで議論してください。
