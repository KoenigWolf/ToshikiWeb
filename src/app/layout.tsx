// =====================================
// ルートレイアウトコンポーネント
// =====================================
import type { Metadata } from "next";
import { Noto_Sans_JP, Geist, Geist_Mono } from "next/font/google";
import { SplashCursor } from '@/components/ui/splash-cursor';
import "./globals.css";

// =====================================
// フォント設定
// =====================================
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
export const metadata: Metadata = {
  title: "Toshiki Sakuta | エンジニアPortfolio",
  description:
    "Toshiki SakutaのエンジニアPortfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
};

// =====================================
// ルートレイアウトコンポーネント
// =====================================
// children を受け取り、ページの内容を挿入。
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased font-sans`}
      >
        <SplashCursor 
          SPLAT_RADIUS={0.25}
          COLOR_UPDATE_SPEED={15}
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
        />
        {children}
      </body>
    </html>
  );
}
