// =============================
// Portfolioの型
// =============================
/**
 * ポートフォリオ項目の型定義
 */
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  period: string;
  image?: string;
  skills: string[];
  tags: string[];
  url?: string;
  category: string;
  featured?: boolean;
  // 詳細情報
  details?: {
    overview?: string;
    features?: string[];
    challenges?: string[];
    solutions?: string[];
  };
  // 外部リンク
  demoUrl?: string;
  githubUrl?: string;
}

/**
 * ポートフォリオのカテゴリーの型定義
 */
export type PortfolioCategory = 'all' | 'web' | 'mobile' | 'design' | 'other';

/**
 * ポートフォリオのフィルター条件の型定義
 */
export interface PortfolioFilter {
  category: PortfolioCategory;
  search: string;
}