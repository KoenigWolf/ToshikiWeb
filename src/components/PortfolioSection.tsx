"use client";

import { motion } from "framer-motion";
import { PortfolioCard } from "./common/PortfolioCard";
import { portfolioItems as defaultItems } from "@/lib/data/portfolio";
import { getFilteredItems } from "@/lib/hooks/portfolio";
import { usePortfolioFilterStore } from "@/lib/hooks/features/portfolio";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/types/portfolio";
import { Filter, ArrowRight } from "lucide-react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { escape } from "lodash";

// Props
interface PortfolioSectionProps {
  items?: PortfolioItem[];
}

// Main Portfolio Section
export function PortfolioSection({ items = defaultItems }: PortfolioSectionProps) {
  const { filter, setFilter } = usePortfolioFilterStore();

  // 現在のフィルターに一致するアイテムを取得
  const filteredItems = getFilteredItems(items, filter);

  // 全タグのユニークな一覧
  const tags = Array.from(new Set(items.flatMap((item) => item.tags)));

  // ランダムな抽象的なスタイルを生成する関数
  const getRandomStyle = (index: number) => {
    const styles = [
      { rotate: -2, scale: 0.98 },
      { rotate: 1, scale: 1.02 },
      { rotate: -1, scale: 1 },
      { rotate: 2, scale: 0.99 },
      { rotate: 0, scale: 1.01 },
    ];
    return styles[index % styles.length];
  };

  return (
    <Section id="portfolio" variant="muted" className="relative overflow-hidden">
      {/* 抽象的な背景要素 */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="absolute w-64 h-64 rounded-full bg-primary -top-10 -left-10" />
        <div 
          className="absolute w-80 h-80 bg-secondary -bottom-20 -right-20"
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
        />
        <div 
          className="absolute w-40 h-40 bg-accent top-1/2 left-1/4" 
          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
        />
      </div>

      <SectionTitle title="Portfolio" animated centered className="relative z-10" />

      {/* タグフィルター */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-8">
        <TagFilterButton
          label="全て"
          isActive={filter === "all"}
          onClick={() => setFilter("all")}
          icon={<Filter className="w-4 h-4 mr-1" />}
        />
        {tags.map((tag) => (
          <TagFilterButton
            key={tag}
            label={tag}
            isActive={filter === tag}
            onClick={() => setFilter(tag)}
          />
        ))}
      </div>

      {/* ポートフォリオカード */}
      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, ...getRandomStyle(index) }}
            whileInView={{ opacity: 1, y: 0, ...getRandomStyle(index) }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex h-full"
            whileHover={{ 
              scale: 1.03, 
              rotate: getRandomStyle(index).rotate * -0.5, 
              transition: { duration: 0.3 } 
            }}
          >
            <PortfolioCard item={item} className="flex-1 w-full picasso-border" />
          </motion.div>
        ))}
      </div>

      {/* 「もっと見る」 */}
      {/* <div className="relative z-10 mt-8 text-center"> */}
        {/* <Button asChild className="picasso-border"> */}
          {/* <Link href="/portfolio" aria-label="ポートフォリオ一覧ページへ"> */}
            {/* もっと見る <ArrowRight className="w-4 h-4 ml-2" /> */}
          {/* </Link> */}
        {/* </Button> */}
      {/* </div> */}
    </Section>
  );
}

// フィルターボタン（shadcn/ui Button 拡張）
interface TagFilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const TagFilterButton = ({
  label,
  isActive,
  onClick,
  icon,
}: TagFilterButtonProps) => (
  <Button
    variant={isActive ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={`flex items-center font-noto-sans-jp transition-all ${isActive ? "picasso-border" : ""}`}
  >
    {icon}
    {escape(label)}
  </Button>
);
