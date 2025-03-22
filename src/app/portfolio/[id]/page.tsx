import { notFound } from "next/navigation";
import { getPortfolioItems } from "@/lib/server/portfolio";
import { DetailLayout } from "@/components/common/DetailLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// =============================
// 静的パスを生成
// =============================
export async function generateStaticParams() {
  const portfolioItems = await getPortfolioItems();
  return portfolioItems.map((item) => ({ id: item.id }));
}

// =============================
// Portfolio詳細ページ
// =============================
interface Params {
  id: string;
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = params;
  const portfolioItems = await getPortfolioItems();
  const portfolio = portfolioItems.find((item) => item.id === id);

  if (!portfolio) {
    notFound();
  }

  return (
    <DetailLayout title={portfolio.title} backText="ポートフォリオに戻る" backPath="/#portfolio">
      <div className="space-y-6">
        {portfolio.image && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="object-cover w-full h-auto"
            />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold font-noto-sans-jp">プロジェクト期間</h2>
          <p className="mt-2 text-muted-foreground">{portfolio.period}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold font-noto-sans-jp">概要</h2>
          <p className="mt-2">{portfolio.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold font-noto-sans-jp">使用技術</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {portfolio.tags.map((tag) => (
              <Badge key={tag} className="font-noto-sans-jp">{tag}</Badge>
            ))}
          </div>
        </div>

        {portfolio.details && (
          <>
            {portfolio.details.overview && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="mb-4 text-xl font-bold font-noto-sans-jp">プロジェクト詳細</h2>
                  <p>{portfolio.details.overview}</p>
                </CardContent>
              </Card>
            )}
            
            {portfolio.details.features && portfolio.details.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold font-noto-sans-jp">主な機能</h2>
                <ul className="mt-2 ml-6 list-disc">
                  {portfolio.details.features.map((feature) => (
                    <li key={feature} className="mt-1">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mt-8">
              {portfolio.demoUrl && (
                <Button asChild>
                  <a 
                    href={portfolio.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    デモサイトを開く
                  </a>
                </Button>
              )}
              
              {portfolio.githubUrl && (
                <Button variant="outline" asChild>
                  <a 
                    href={portfolio.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    ソースコードを見る
                  </a>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </DetailLayout>
  );
}
