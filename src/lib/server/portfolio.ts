// =====================================
// ポートフォリオデータ取得
// =====================================

import { portfolioItems } from "@/lib/data/portfolio";
import type { PortfolioItem } from "@/lib/types/portfolio";

/**
 * ポートフォリオアイテム一覧を取得
 * @returns ポートフォリオアイテムの配列
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  // TODO: 将来的にDBやAPIから取得する場合を想定してasync関数として定義
  return portfolioItems;
}

/**
 * タグでフィルタリングされたポートフォリオアイテム一覧を取得
 * @param tag フィルタリングするタグ
 * @returns フィルタリングされたポートフォリオアイテムの配列
 */
export async function getPortfolioItemsByTag(tag: string): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems();
  return items.filter(item => item.tags.includes(tag));
}

/**
 * 利用可能なタグ一覧を取得
 * @returns タグの配列
 */
export async function getPortfolioTags(): Promise<string[]> {
  const items = await getPortfolioItems();
  const tags = new Set(items.flatMap(item => item.tags));
  return Array.from(tags).sort();
}

/**
 * 指定された数のポートフォリオアイテムを取得
 * @param limit 取得するアイテム数
 * @returns 制限されたポートフォリオアイテムの配列
 */
export async function getLimitedPortfolioItems(limit: number): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems();
  return items.slice(0, limit);
}