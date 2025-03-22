// =====================================
// ポートフォリオページ
// =====================================

import { Suspense } from "react";
import { getPortfolioItems } from "@/lib/server/portfolio";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "ポートフォリオ | Toshiki Sakuta",
  description: "私のこれまでの制作物をご紹介します。",
};

// 読み込み中の表示コンポーネント
const PortfolioLoading = () => (
  <div className="py-12">
    <Skeleton className="w-full h-64 rounded-lg" />
    <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-64 rounded-lg" />
      ))}
    </div>
  </div>
);

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <>
      <Header />
      <main className="py-20">
        <div className="container mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl font-noto-sans-jp">
            ポートフォリオ
          </h1>
          <Suspense fallback={<PortfolioLoading />}>
            <PortfolioGrid
              items={items}
              showFilters
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
