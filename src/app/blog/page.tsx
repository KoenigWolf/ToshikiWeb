import { generateMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "ブログ | Toshiki Sakuta",
  description: "技術的な知見やプロジェクトについての記事を公開しています。",
  keywords: ["ブログ", "技術記事", "Web開発", "エンジニアリング"],
});

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="container py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold">ブログ</h1>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Nextjs App Routerを使った効率的なフロントエンド開発</CardTitle>
              <CardDescription>2023年12月15日</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Next.jsのApp Routerは、従来のPages Routerと比較して多くの利点があります。
                このポストでは、App Routerの基本的な使い方と、それがもたらす開発効率の向上について解説します。
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
                <Link href="/blog/nextjs-app-router" className="flex items-center">
                  続きを読む
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Supabaseを活用したバックエンドの構築</CardTitle>
              <CardDescription>2023年11月10日</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Supabaseは、Firebase代替として注目を集めているBaaSです。
                PostgreSQLベースの強力なデータベース機能と認証機能を併せ持ち、APIの自動生成も可能です。
                この記事では、Supabaseを使ったプロジェクトの立ち上げから運用までをカバーします。
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
                <Link href="/blog/supabase-backend" className="flex items-center">
                  続きを読む
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>shadcn/uiでスタイリッシュなUIを構築する</CardTitle>
              <CardDescription>2023年10月5日</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                shadcn/uiは、Radix UIをベースにした再利用可能なコンポーネントコレクションです。
                TailwindCSSと組み合わせることで、美しくアクセシブルなUIを効率的に構築できます。
                この記事では、shadcn/uiの導入方法と、カスタマイズのテクニックを紹介します。
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
                <Link href="/blog/shadcn-ui" className="flex items-center">
                  続きを読む
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
} 