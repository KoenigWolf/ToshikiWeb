import type { PortfolioItem } from "../types/portfolio";

/**
 * ポートフォリオアイテムをフィルタリングする関数
 * 
 * @param items フィルタリング対象のアイテム配列
 * @param filter フィルタに使用するタグ (nullまたは "all" の場合は全てのアイテムを返す)
 * @returns フィルタリングされたアイテム配列
 */
export function getFilteredItems(items: PortfolioItem[], filter: string | null): PortfolioItem[] {
  if (!filter || filter === "all") {
    return items;
  }
  
  return items.filter(item => item.tags.includes(filter));
} 