// =====================================
// ルートレイアウトコンポーネント
// =====================================
// - フォントの適用
// - メタデータの設定
// - 全体のレイアウトを定義

import type { Metadata } from "next";
import { Noto_Sans_JP, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// =====================================
// フォント設定
// =====================================
// Google Fonts を `next/font/google` で管理し、CSS 変数で適用。
// `subsets` は不要なフォントの読み込みを避けるために指定。

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// =====================================
// サイトのメタデータ設定
// =====================================
// - SEO に関する情報を管理し、他のページでも利用可能にする。
// - `title` や `description` を定義し、検索エンジン最適化（SEO）を強化。

export const metadata: Metadata = {
  title: "Toshiki Sakuta | エンジニアPortfolio",
  description:
    "Toshiki SakutaのエンジニアPortfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
};

// =====================================
// ルートレイアウトコンポーネント
// =====================================
// - `<html>` タグで `lang="ja"` を指定し、言語を適切に設定。
// - `body` にフォントを適用し、アンチエイリアスを有効化。
// - `children` を受け取り、ページの内容を挿入。

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
