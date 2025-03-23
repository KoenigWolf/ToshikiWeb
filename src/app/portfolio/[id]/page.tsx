import { notFound } from "next/navigation";
import { getPortfolioItems } from "@/lib/server/portfolio";
import { DetailLayout } from "@/components/common/DetailLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { escape as htmlEscape } from "lodash";

// =============================
// 静的パスを生成（SSG対応）
// =============================
export async function generateStaticParams() {
  const portfolioItems = await getPortfolioItems();
  return portfolioItems.map((item) => ({ id: item.id }));
}

// =============================
// ページコンポーネント定義
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

  if (!portfolio) notFound();

  const features = portfolio.details?.features ?? [];

  return (
    <DetailLayout
      title={portfolio.title}
      backText="ポートフォリオに戻る"
      backPath="/#portfolio"
    >
      <div className="space-y-6">
        {/* メインビジュアル */}
        {portfolio.image && (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={portfolio.image}
              alt={portfolio.title}
              width={1200}
              height={630}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        )}

        {/* 概要 */}
        <Section title="概要">
          <p>{htmlEscape(portfolio.description)}</p>
        </Section>

        {/* 使用技術 */}
        <Section title="使用技術">
          <div className="flex flex-wrap gap-2">
            {portfolio.tags.map((tag) => (
              <Badge key={tag} className="font-noto-sans-jp">
                {htmlEscape(tag)}
              </Badge>
            ))}
          </div>
        </Section>

        {/* 詳細セクション */}
        {portfolio.details && (
          <>
            {portfolio.details.overview && (
              <Card>
                <CardContent className="pt-6">
                  <Section title="プロジェクト詳細">
                    <p>{htmlEscape(portfolio.details.overview)}</p>
                  </Section>
                </CardContent>
              </Card>
            )}

            {features.length > 0 && (
              <Section title="主な機能">
                <ul className="ml-6 list-disc">
                  {features.map((feature) => (
                    <li key={feature} className="mt-1">
                      {htmlEscape(feature)}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* 外部リンク */}
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

// =============================
// セクション共通コンポーネント
// =============================
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-6">
    <h2 className="text-xl font-bold font-noto-sans-jp">{title}</h2>
    <div className="mt-2">{children}</div>
  </section>
);
