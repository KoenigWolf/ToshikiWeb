import { Metadata } from "next";
import { PortfolioGrid } from "@/components/organisms/PortfolioGrid";

// =============================
// メタデータ
// =============================
export const metadata: Metadata = {
  title: "ポートフォリオ一覧 | 作品集",
  description: "佐久田俊樹のポートフォリオ作品一覧です。Webアプリケーション、モバイルアプリ、デザイン作品などを掲載しています。",
};

// =============================
// Portfolio一覧ページ
// =============================
export default function PortfolioPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-noto-sans-jp">
          ポートフォリオ作品一覧
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          これまで手がけた主要なプロジェクトの一覧です。各作品の詳細ページでは、使用技術や開発プロセスについて詳しく紹介しています。
        </p>
        
        <PortfolioGrid showFilters={true} />
      </div>
    </main>
  );
} 