"use client";

import { Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePortfolioFilterStore } from "@/hooks/features/portfolio/use-portfolio-filter-store";
import type { PortfolioItem } from "@/lib/types/portfolio";
import { PortfolioCard } from "@/components/features/PortfolioCard";
import { PortfolioFilter } from "@/components/features/PortfolioFilter";

// =====================================
// 型定義
// =====================================
interface PortfolioGridProps {
  /**
   * 表示するアイテムのリスト
   */
  items: PortfolioItem[];

  /**
   * フィルターを表示するかどうか
   */
  showFilters?: boolean;

  /**
   * オプションのクラス名
   */
  className?: string;
}

// =====================================
// ポートフォリオグリッドコンポーネント
// =====================================
export function PortfolioGrid({
  items,
  showFilters = false,
  className = "",
}: PortfolioGridProps) {
  const { filteredItems, hasMore, viewAll, setItems } = usePortfolioFilterStore();

  // コンポーネントがマウントされた時に、アイテムをストアに設定
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  return (
    <div className={className}>
      {/* フィルター */}
      {showFilters && (
        <div className="mb-8">
          <PortfolioFilter items={items} />
        </div>
      )}

      {/* グリッド */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Fragment key={item.id}>
            <PortfolioCard item={item} />
          </Fragment>
        ))}
      </div>

      {/* すべてのポートフォリオを表示するボタン */}
      <div className="mt-8 text-center">
        <Button onClick={viewAll} variant="outline" className="w-full">すべて表示</Button>
      </div>
    </div>
  );
}