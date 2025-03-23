"use client";

import { useEffect } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/common/PortfolioCard";
import { PortfolioFilter } from "@/components/common/PortfolioFilter";
import { usePortfolioFilterStore } from "@/hooks/features/portfolio/use-portfolio-filter-store";
import type { PortfolioItem } from "@/lib/types/portfolio";

// ==============================
// Props型定義
// ==============================
interface PortfolioGridProps {
  /** 表示するポートフォリオアイテムのリスト */
  items: PortfolioItem[];

  /** フィルターUIを表示するか */
  showFilters?: boolean;

  /** カスタムクラス名 */
  className?: string;
}

// ==============================
// PortfolioGrid コンポーネント
// ==============================
export function PortfolioGrid({
  items,
  showFilters = false,
  className = "",
}: PortfolioGridProps) {
  const { filteredItems, hasMore, viewAll, setItems } = usePortfolioFilterStore();

  // 初期マウント時に items をセット（グローバルストアへ）
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  return (
    <div className={cn("space-y-8", className)}>
      {/* フィルターエリア（任意表示） */}
      {showFilters && (
        <div>
          <PortfolioFilter items={items} />
        </div>
      )}

      {/* グリッド表示 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item.id}>
            <PortfolioCard item={item} />
          </div>
        ))}
      </div>

      {/* "すべて表示" ボタン（hasMore が true の時のみ） */}
      {hasMore && (
        <div className="text-center">
          <Button onClick={viewAll} variant="outline" size="lg" className="w-full sm:w-auto">
            <Eye className="w-4 h-4 mr-2" />
            すべて表示
          </Button>
        </div>
      )}
    </div>
  );
}
