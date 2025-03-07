import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/data";
import { PortfolioDetail } from "@/components/organisms/PortfolioDetail";

// =============================
// 静的パスを生成
// =============================
export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ id: item.id }));
}

// =============================
// Portfolio詳細ページ
// =============================
export default async function PortfolioDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = params;
  const portfolio = portfolioItems.find((item) => item.id === id);

  if (!portfolio) {
    notFound();
  }

  return <PortfolioDetail projectId={id} />;
}
