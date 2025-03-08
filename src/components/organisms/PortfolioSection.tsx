"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { PortfolioGrid } from "@/components/organisms/portfolio/PortfolioGrid";
import { SectionTitle } from "@/components/molecules/SectionTitle";
import { ViewAllButton } from "@/components/atoms/ViewAllButton";

// =====================================
// 型定義
// =====================================
type PortfolioSectionProps = {
  // セクションのID（アンカーリンク用）
  id?: string; 
  
  // 表示する最大アイテム数
  maxItems?: number;
};

// =====================================
// アニメーション設定（Variants）
// =====================================
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// =====================================
// PortfolioSection
// トップページで使用するポートフォリオ一覧表示セクション
// Atomic Design：Organism (SectionTitle, PortfolioGrid を含む)
// =====================================
/**
 * Portfolio一覧を表示するセクションコンポーネント
 * 
 * @param props.id - セクションのID（アンカーリンク用）
 * @param props.maxItems - 表示する最大のポートフォリオアイテム数
 * @returns PortfolioSectionコンポーネント
 */
export function PortfolioSection({ id = "portfolio", maxItems = 6 }: PortfolioSectionProps) {
  return (
    <motion.section 
      id={id} 
      className="py-20 bg-gray-50 dark:bg-gray-900"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* セクションタイトル */}
        <SectionTitle
          title="Portfolio"
        />

        {/* ポートフォリオ一覧 */}
        <PortfolioGrid 
          showFilters 
          maxItems={maxItems} 
        />

        {/* すべての作品を見るボタン */}
        <ViewAllButton 
          href="/portfolio"
          text="すべての作品を見る"
          size="lg"
        />
      </div>
    </motion.section>
  );
}
