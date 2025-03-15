import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/organisms/PortfolioGrid";
import { BackButton } from "@/components/atoms/BackButton";

// =============================
// メタデータ
// =============================
export const metadata: Metadata = {
  title: "ポートフォリオ一覧 | 作品集",
  description: "ポートフォリオ作品一覧です。Webアプリケーション、モバイルアプリ、デザイン作品などを掲載しています。",
};

// =============================
// Portfolio一覧ページ
// =============================
export default function PortfolioPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        {/* 戻るボタン */}
        <div className="mb-6">
          <BackButton 
            href="/" 
            text="メインに戻る" 
            variant="outline"
          />
        </div>

        {/* ページタイトル */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-noto-sans-jp">
          Portfolio
        </h1>

        {/* ポートフォリオ一覧 */}
        <PortfolioGrid showFilters={true} />
      </div>
    </main>
  );
}
