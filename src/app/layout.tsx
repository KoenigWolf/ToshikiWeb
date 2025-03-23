// ルートレイアウトコンポーネント
import type { Metadata } from "next";
import { SplashCursorWrapper } from "@/components/common/SplashCursorWrapper";
import { AppWrapper } from "@/components/common/AppWrapper";
import { fontClasses } from "@/lib/fonts"; // フォント設定を分離
import "./globals.css";

// ピカソスタイルのシグネチャーコンポーネント
const PicassoSignature = () => (
  <div className="fixed z-50 transition-opacity duration-300 pointer-events-none bottom-4 right-4 opacity-30 hover:opacity-70">
    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <title>ピカソスタイルのシグネチャー</title>
      <path d="M10,25 C15,5 25,15 30,5 C35,15 45,5 50,25" stroke="var(--primary)" strokeWidth="1.5" />
      <path d="M60,5 C55,15 65,25 70,15" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M5,20 L15,10" stroke="var(--secondary)" strokeWidth="1.5" />
    </svg>
  </div>
);

// メタデータ設定
export const metadata: Metadata = {
  title: "Toshiki Sakuta | Portfolio",
  description:
    "Portfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
};

// ルートレイアウトコンポーネント：すべてのページの共通レイアウトを提供
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={`${fontClasses} antialiased font-sans`}>
        {/* 背景エフェクト（流体シミュレーション） */}
        <SplashCursorWrapper />

        {/* 各ページのコンテンツ */}
        <AppWrapper>
          {children}
        </AppWrapper>
        
        {/* ピカソスタイルのシグネチャー */}
        <PicassoSignature />
      </body>
    </html>
  );
}
