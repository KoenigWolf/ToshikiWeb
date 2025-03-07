import { Metadata } from "next";
import { PortfolioGrid } from "@/components/organisms/PortfolioGrid";

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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-noto-sans-jp">
          Portfolio
        </h1>
        
        <PortfolioGrid showFilters={true} />
      </div>
    </main>
  );
} 