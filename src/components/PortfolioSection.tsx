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

  return (
    <Section id="portfolio" variant="muted">
      <SectionTitle title="Portfolio" animated centered />

      {/* タグフィルター */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex h-full"
          >
            <PortfolioCard item={item} className="flex-1 w-full" />
          </motion.div>
        ))}
      </div>

      {/* 「もっと見る」 */}
      {/* <div className="mt-8 text-center"> */}
        {/* <Button asChild> */}
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
    className="flex items-center font-noto-sans-jp"
  >
    {icon}
    {escape(label)}
  </Button>
);
