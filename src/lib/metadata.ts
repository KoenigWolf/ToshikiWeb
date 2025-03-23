import type { Metadata } from "next";

type MetadataParams = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  locale?: string;
};

// ベースとなるメタデータ
const baseMetadata: Metadata = {
  title: {
    default: "Toshiki Sakuta | Portfolio",
    template: "%s | Toshiki Sakuta",
  },
  description: "Toshiki SakutaのPortfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
  keywords: ["Web開発", "クラウド", "エンジニア", "ポートフォリオ", "Toshiki Sakuta"],
  authors: [{ name: "Toshiki Sakuta" }],
  creator: "Toshiki Sakuta",
  publisher: "Toshiki Sakuta",
  metadataBase: new URL("https://example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Toshiki Sakuta | Portfolio",
    description: "Toshiki SakutaのPortfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
    url: "https://example.com",
    siteName: "Toshiki Sakuta Portfolio",
    locale: "ja_JP",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Toshiki Sakuta Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toshiki Sakuta | Portfolio",
    description: "Toshiki SakutaのPortfolioサイトです。クラウド技術、業務自動化、インフラ運用、Web開発の経験を紹介しています。",
    creator: "@toshiki",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * ページごとのメタデータを生成する関数
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  noIndex = false,
  locale = "ja_JP",
}: MetadataParams): Metadata {
  // ベースのメタデータをコピー
  const metadata: Metadata = { ...baseMetadata };

  // タイトルの設定
  if (title) {
    metadata.title = title;
    if (metadata.openGraph) {
      metadata.openGraph.title = title;
    }
    if (metadata.twitter) {
      metadata.twitter.title = title;
    }
  }

  // 説明の設定
  if (description) {
    metadata.description = description;
    if (metadata.openGraph) {
      metadata.openGraph.description = description;
    }
    if (metadata.twitter) {
      metadata.twitter.description = description;
    }
  }

  // キーワードの設定
  if (keywords.length > 0) {
    metadata.keywords = [...(metadata.keywords || []), ...keywords];
  }

  // OGP画像の設定
  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title || "Toshiki Sakuta Portfolio",
      },
    ];
    
    if (metadata.twitter) {
      metadata.twitter.images = [image];
    }
  }

  // ロケールの設定
  if (locale && metadata.openGraph) {
    metadata.openGraph.locale = locale;
  }

  // インデックス設定
  if (noIndex && metadata.robots) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }

  return metadata;
} 