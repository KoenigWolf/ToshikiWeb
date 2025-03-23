
// フォント設定（Next.js フォント最適化対応）

import { Inter, Noto_Sans_JP, Roboto_Mono } from "next/font/google";


// フォントのインスタンス生成

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});


// クラス名を統合してエクスポート

export const fontClasses = `${inter.variable} ${robotoMono.variable} ${notoSansJP.variable}`;
