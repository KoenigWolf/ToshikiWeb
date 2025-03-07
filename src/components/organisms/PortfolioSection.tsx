"use client";

import { motion } from "framer-motion";
import { PortfolioGrid } from "./PortfolioGrid";

// =====================================
// ポートフォリオ一覧セクションコンポーネント
// =====================================
export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">Portfolio</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            これまでの制作物や技術的チャレンジをご紹介します。詳細は各プロジェクトページをご覧ください。
          </p>
        </motion.div>

        <PortfolioGrid 
          showFilters={true} 
          maxItems={6} 
          showButton={true} 
        />
      </div>
    </section>
  );
}