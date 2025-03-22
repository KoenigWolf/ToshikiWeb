import { generateMetadata as createMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// ブログ記事のモックデータ
const blogPosts = [
  {
    slug: "nextjs-app-router",
    title: "Nextjs App Routerを使った効率的なフロントエンド開発",
    date: "2023年12月15日",
    content: `
      Next.jsのApp Routerは、従来のPages Routerと比較して多くの利点があります。
      
      ## App Routerの主な特徴
      
      - サーバーコンポーネントをデフォルトでサポート
      - ネスト化されたレイアウトの使いやすさ
      - インタラクティブなサーバーコンポーネント
      - 高度なデータフェッチング機能
      
      ## サーバーコンポーネントのメリット
      
      サーバーコンポーネントを使用することで、JavaScriptバンドルサイズを削減し、
      初期読み込み時間を短縮できます。また、サーバー側でのデータフェッチングが
      シンプルになり、APIルートを介さずに直接データベースにアクセスできます。
      
      ## レイアウト機能の改善
      
      App Routerでは、ルートごとにレイアウトを定義でき、ネスト化も簡単です。
      これにより、複雑なUI構造もシンプルに管理できるようになりました。
    `,
    excerpt: "Next.jsのApp Routerは、従来のPages Routerと比較して多くの利点があります。このポストでは、App Routerの基本的な使い方と、それがもたらす開発効率の向上について解説します。",
    image: "/blog/nextjs-app-router.jpg"
  },
  {
    slug: "supabase-backend",
    title: "Supabaseを活用したバックエンドの構築",
    date: "2023年11月10日",
    content: `
      Supabaseは、Firebase代替として注目を集めているBaaSです。
      
      ## Supabaseの主な機能
      
      - PostgreSQLデータベース
      - リアルタイムサブスクリプション
      - 認証と権限管理
      - ストレージ
      - エッジ関数
      
      ## PostgreSQLの利点
      
      Supabaseの中核はPostgreSQLデータベースであり、リレーショナルデータベースの
      すべての機能を活用できます。また、PostgreSQLの拡張機能も使用可能です。
      
      ## 認証システム
      
      Supabaseは、メール/パスワード認証だけでなく、ソーシャルログイン、電話認証など
      さまざまな認証方法をサポートしています。Row Level Securityを使ったデータアクセス制御も
      簡単に実装できます。
    `,
    excerpt: "Supabaseは、Firebase代替として注目を集めているBaaSです。PostgreSQLベースの強力なデータベース機能と認証機能を併せ持ち、APIの自動生成も可能です。この記事では、Supabaseを使ったプロジェクトの立ち上げから運用までをカバーします。",
    image: "/blog/supabase-backend.jpg"
  },
  {
    slug: "shadcn-ui",
    title: "shadcn/uiでスタイリッシュなUIを構築する",
    date: "2023年10月5日",
    content: `
      shadcn/uiは、Radix UIをベースにした再利用可能なコンポーネントコレクションです。
      
      ## shadcn/uiの特徴
      
      - コピー&ペーストで使えるコンポーネント
      - TailwindCSSによるスタイリング
      - アクセシビリティを考慮した設計
      - カスタマイズの自由度の高さ
      
      ## インストール方法
      
      shadcn/uiはパッケージとしてインストールするのではなく、コンポーネントをコピーして
      自分のプロジェクトに取り込む方式です。これにより、コードの完全な制御が可能になります。
      
      \`\`\`bash
      npx shadcn-ui@latest init
      \`\`\`
      
      ## コンポーネントの追加
      
      必要なコンポーネントだけを追加できるため、バンドルサイズを最小限に保てます。
      
      \`\`\`bash
      npx shadcn-ui@latest add button
      \`\`\`
    `,
    excerpt: "shadcn/uiは、Radix UIをベースにした再利用可能なコンポーネントコレクションです。TailwindCSSと組み合わせることで、美しくアクセシブルなUIを効率的に構築できます。この記事では、shadcn/uiの導入方法と、カスタマイズのテクニックを紹介します。",
    image: "/blog/shadcn-ui.jpg"
  }
];

// 型定義
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// メタデータを動的に生成
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return createMetadata({
      title: "記事が見つかりません",
      description: "お探しの記事は見つかりませんでした。",
    });
  }
  
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    keywords: ["ブログ", "技術記事", post.slug.replace(/-/g, " ")],
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <>
      <Header />
      <main className="container py-8 mx-auto">
        <Card className="max-w-3xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
              <p className="mb-6 text-muted-foreground">{post.date}</p>
              
              {post.image && (
                <Card className="relative w-full h-[400px] mb-8 overflow-hidden">
                  <OptimizedImage 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover"
                    priority
                  />
                </Card>
              )}
              
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, i) => {
                  // 見出しの処理
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={`heading-${post.slug}-${i}`} className="mt-8 mb-4 text-2xl font-semibold">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  
                  // コードブロックの処理
                  if (paragraph.includes('```')) {
                    const [before, code, after] = paragraph.split('```');
                    return (
                      <div key={`code-${post.slug}-${i}`}>
                        {before && <p className="mb-4">{before}</p>}
                        {code && (
                          <Card className="mb-4 overflow-x-auto">
                            <CardContent className="p-4 bg-muted">
                              <code>{code}</code>
                            </CardContent>
                          </Card>
                        )}
                        {after && <p className="mb-4">{after}</p>}
                      </div>
                    );
                  }
                  
                  // 通常の段落
                  return (
                    <p key={`para-${post.slug}-${i}`} className="mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              
              <Card className="mt-12">
                <CardContent className="p-4">
                  <Button asChild variant="outline">
                    <Link href="/blog" className="flex items-center">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      ブログ一覧に戻る
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}

// 静的ページ生成のためのパスを定義
export function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
} 