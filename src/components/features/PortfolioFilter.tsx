"use client";

// =====================================
// ポートフォリオフィルターコンポーネント
// =====================================

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePortfolioFilterStore } from "@/hooks/features/portfolio/use-portfolio-filter-store";
import type { PortfolioItem } from "@/lib/types/portfolio";

export interface PortfolioFilterProps {
  /** フィルタリング対象のアイテム */
  items: PortfolioItem[];
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * ポートフォリオフィルター：プロジェクトのフィルタリングUIを提供
 */
export function PortfolioFilter({
  items,
  className = "",
}: PortfolioFilterProps) {
  const { filter, setFilter, allTags, setItems } = usePortfolioFilterStore();

  // コンポーネントがマウントされた時に、アイテムをストアに設定
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant={filter === null ? "secondary" : "outline"}
        size="sm"
        onClick={() => setFilter(null)}
        className="font-noto-sans-jp"
      >
      </Button>
      {allTags.map((tag) => (
        <Button
          key={tag}
          variant={filter === tag ? "secondary" : "outline"}
          size="sm"
          onClick={() => setFilter(tag)}
          className="font-noto-sans-jp"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}