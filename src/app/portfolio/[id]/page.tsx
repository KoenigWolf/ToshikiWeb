import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowLeft, FileCode, Layers } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { 
  getImagesFromGitHub,
  getPortfolioThumbnail 
} from "@/lib/utils";

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
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const portfolio = portfolioItems.find((item) => item.id === id);
  if (!portfolio) notFound();

  // GitHubから画像を自動取得（autoFetchImagesがtrueの場合）
  let portfolioImages = [...portfolio.details.images];
  
  if (portfolio.details.autoFetchImages && portfolio.githubUrl) {
    try {
      const githubImages = await getImagesFromGitHub(portfolio.githubUrl, portfolioImages);
      if (githubImages.length > 0) {
        portfolioImages = githubImages;
      }
    } catch (error) {
      console.error('Failed to fetch images from GitHub:', error);
    }
  }

  // サムネイル画像を取得
  const thumbnailImage = getPortfolioThumbnail(portfolio.thumbnail, portfolio.githubUrl);

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <PortfolioHeader portfolio={portfolio} />
        <PortfolioMainImage 
          portfolio={portfolio} 
          mainImage={portfolioImages[0] || thumbnailImage} 
        />
        <PortfolioDetails portfolio={portfolio} />
        <PortfolioGallery 
          portfolio={portfolio} 
          images={portfolioImages.slice(1)} 
        />
        <PortfolioFooter />
      </div>
    </main>
  );
}

// =============================
// ヘッダーコンポーネント
// =============================
function PortfolioHeader({ portfolio }: { portfolio: typeof portfolioItems[number] }) {
  return (
    <div className="mb-8">
      <Link href="/#portfolio" className="inline-flex items-center text-primary hover:underline mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="font-noto-sans-jp">Portfolio一覧に戻る</span>
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">{portfolio.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-noto-sans-jp">{portfolio.description}</p>

      {/* タグ表示 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {portfolio.tags.map((tag) => (
          <Badge key={tag} className="font-noto-sans-jp">{tag}</Badge>
        ))}
      </div>

      {/* リンクボタン */}
      <div className="flex flex-wrap gap-4">
        {portfolio.githubUrl && (
          <Button asChild className="gap-2">
            <a href={portfolio.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="font-noto-sans-jp">GitHub</span>
            </a>
          </Button>
        )}
        {portfolio.demoUrl && (
          <Button variant="outline" asChild className="gap-2">
            <a href={portfolio.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="font-noto-sans-jp">デモを見る</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

// =============================
// メインビジュアルコンポーネント
// =============================
function PortfolioMainImage({ 
  portfolio, 
  mainImage 
}: { 
  portfolio: typeof portfolioItems[number];
  mainImage: string;
}) {
  const isDefaultImage = !mainImage || mainImage.includes('default-thumbnail');
  
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-12 shadow-lg">
      {isDefaultImage ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
          <FileCode className="w-24 h-24 mb-4 opacity-70" />
          <h3 className="text-xl md:text-2xl font-semibold text-center font-noto-sans-jp">
            {portfolio.title}
          </h3>
          <p className="mt-2 text-center max-w-md opacity-80 font-noto-sans-jp">
            {portfolio.githubUrl ? "GitHubリポジトリからの画像を読み込めませんでした。" : "このプロジェクトには画像が登録されていません。"}
          </p>
        </div>
      ) : (
        <Image
          src={mainImage}
          alt={portfolio.title}
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  );
}

// =============================
// 詳細情報コンポーネント
// =============================
function PortfolioDetails({ portfolio }: { portfolio: typeof portfolioItems[number] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <div className="lg:col-span-2">
        <Section title="概要">{portfolio.details.overview}</Section>
        <Section title="主な機能">
          <ul className="list-disc pl-5 space-y-2">
            {portfolio.details.features.map((feature) => (
              <li key={`feature-${feature}`} className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">{feature}</li>
            ))}
          </ul>
        </Section>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Section title="課題">{portfolio.details.challenges}</Section>
            <Section title="解決策">{portfolio.details.solutions}</Section>
          </CardContent>
        </Card>
      </div>

      {/* 使用技術 */}
      <div>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4 font-noto-sans-jp">使用技術</h3>
            <div className="space-y-2">
              {portfolio.details.technologies.map((tech) => (
                <Badge key={`tech-${tech}`} variant="outline" className="block w-full py-2 px-3 text-center font-noto-sans-jp">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// =============================
// ギャラリーコンポーネント
// =============================
function PortfolioGallery({ portfolio, images }: { portfolio: typeof portfolioItems[number]; images: string[] }) {
  // 有効な画像のみをフィルタリング（空の文字列やdefault-thumbnailを含む画像を除外）
  const validImages = images.filter(img => img && img.trim() !== '' && !img.includes('default-thumbnail'));
  
  // 有効な画像がない場合は表示しない
  if (validImages.length === 0) {
    if (portfolio.githubUrl) {
      return (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 font-noto-sans-jp">ギャラリー</h2>
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <Layers className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 font-noto-sans-jp">
                GitHubリポジトリから追加の画像を取得できませんでした。
              </p>
            </div>
          </Card>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 font-noto-sans-jp">ギャラリー</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validImages.map((image) => (
          <div key={`gallery-${image}`} className="relative h-64 rounded-lg overflow-hidden shadow-md">
            <Image src={image} alt={`${portfolio.title} screenshot`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================
// フッターコンポーネント
// =============================
function PortfolioFooter() {
  return (
    <div className="text-center">
      <Link href="/#portfolio" className="inline-flex items-center text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="font-noto-sans-jp">Portfolio一覧に戻る</span>
      </Link>
    </div>
  );
}

// =============================
// 汎用セクションコンポーネント
// =============================
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 font-noto-sans-jp">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">{children}</p>
    </div>
  );
}
