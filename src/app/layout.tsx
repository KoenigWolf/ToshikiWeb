// ルートレイアウトコンポーネント
import type { Metadata } from "next";
import { SplashCursorWrapper } from "@/components/common/SplashCursorWrapper";
import { AppWrapper } from "@/components/common/AppWrapper";
import { fontClasses } from "@/lib/fonts"; // フォント設定を分離
import "./globals.css";

// メタデータ設定
export const metadata: Metadata = {
  title: "Toshiki Sakuta | Portfolio",
  description:
    "Toshiki SakutaのPortfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
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
      </body>
    </html>
  );
}
