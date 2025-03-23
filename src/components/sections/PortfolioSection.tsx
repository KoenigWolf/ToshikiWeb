"use client";

import { motion } from "framer-motion";
import { PortfolioCard } from "../features/PortfolioCard";
import { portfolioItems as defaultItems } from "@/lib/data/portfolio";
import { getFilteredItems } from "@/lib/hooks/portfolio";
import { usePortfolioFilterStore } from "@/lib/hooks/features/portfolio";
import { Section } from "@/components/ui/section";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { PortfolioItem } from "@/lib/types/portfolio";

interface PortfolioSectionProps {
  items?: PortfolioItem[];
}

export function PortfolioSection({ items = defaultItems }: PortfolioSectionProps) {
  const { filter, setFilter } = usePortfolioFilterStore();
  const filteredItems = getFilteredItems(items, filter);

  const tags = Array.from(new Set(items.flatMap((item: PortfolioItem) => item.tags)));

  return (
    <Section id="portfolio" variant="muted">
      <SectionTitle 
        title="Portfolio" 
        animated
        centered
      />

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="font-noto-sans-jp"
        >
          全て
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={filter === tag ? "default" : "outline"}
            onClick={() => setFilter(tag)}
            className="font-noto-sans-jp"
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item: PortfolioItem, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <PortfolioCard item={item} />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/portfolio">もっと見る</Link>
        </Button>
      </div>
    </Section>
  );
} 