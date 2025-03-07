"use client";

import { motion } from "framer-motion";
import { PortfolioGrid } from "@/components/molecules/portfolio/PortfolioGrid";
import { SectionTitle } from "@/components/molecules/SectionTitle";

// =====================================
// Types
// =====================================
export interface PortfolioSectionProps {
  /**
   * セクションのID（アンカーリンク用）
   */
  id?: string;
  
  /**
   * 表示する最大アイテム数
   */
  maxItems?: number;
}

// =====================================
// Constants
// =====================================
/**
 * セクションのアニメーション設定
 */
const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

// =====================================
// ポートフォリオ一覧セクションコンポーネント
// =====================================
/**
 * ポートフォリオセクション - トップページで使用するポートフォリオ一覧表示
 * 
 * Atomic Design:
 * - Organism: 複数のMoleculeを組み合わせた独立したセクション
 * - 依存: SectionTitle (Molecule), PortfolioGrid (Molecule)
 * 
 * @param {PortfolioSectionProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ポートフォリオセクションコンポーネント
 */
export function PortfolioSection({ id = "portfolio", maxItems = 6 }: PortfolioSectionProps) {
  return (
    <section id={id} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* セクションタイトルとサブタイトル */}
        <SectionTitle
          title="Portfolio"
          subtitle="これまでの制作物や技術的チャレンジをご紹介します。詳細は各プロジェクトページをご覧ください。"
          animationProps={sectionAnimation}
        />

        {/* ポートフォリオグリッド */}
        <PortfolioGrid 
          showFilters={true} 
          maxItems={maxItems} 
          showButton={true} 
        />
      </div>
    </section>
  );
}