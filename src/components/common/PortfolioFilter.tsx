"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePortfolioFilterStore } from "@/hooks/use-portfolio-filter-store";
import type { PortfolioItem } from "@/lib/types/portfolio";
import { cn } from "@/lib/utils";

export interface PortfolioFilterProps {
  items: PortfolioItem[];   // 表示対象のポートフォリオアイテム
  className?: string;       // オプションのスタイル用クラス
}

// PortfolioFilter：ポートフォリオをタグでフィルタリングするためのボタンUI
export function PortfolioFilter({ items, className }: PortfolioFilterProps) {
  const {
    filter,         // 現在の選択タグ
    setFilter,      // タグ変更処理
    allTags,        // 使用可能な全タグ
    setItems        // 初期アイテムセット（ストア初期化）
  } = usePortfolioFilterStore();

  // マウント時にフィルター対象のアイテムをセット
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* 「すべて」ボタン */}
      <Button
        variant={filter === null ? "secondary" : "outline"}
        size="sm"
        onClick={() => setFilter(null)}
        className="font-noto-sans-jp"
      >
        全て
      </Button>

      {/* タグ別ボタン */}
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
