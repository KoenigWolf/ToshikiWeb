"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { portfolioItems } from "@/lib/portfolio";
import { getPortfolioThumbnail } from "@/lib/utils/github";
import type { PortfolioItem } from "@/lib/types";
import { ViewAllButton } from "@/components/atoms/ViewAllButton";

// =====================================
// Types
// =====================================
export interface PortfolioGridProps {
  /** フィルターの表示有無 */
  showFilters?: boolean;
  
  /** 最大表示アイテム数 */
  maxItems?: number;
  
  /** 「すべての作品を見る」ボタンの表示有無 */
  showButton?: boolean;
  
  /** 追加のCSSクラス */
  className?: string;
}

/** ポートフォリオカードのプロパティ */
interface PortfolioCardProps {
  /** ポートフォリオアイテム */
  item: PortfolioItem;
  
  /** アニメーション遅延時間（秒） */
  delay: number;
}

// =====================================
// Constants
// =====================================
/** フィルターのアニメーション設定 */
const filterAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.2 },
};

/** カードのアニメーション設定を生成する関数 */
const cardAnimation = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

// =====================================
// Components
// =====================================
/**
 * ポートフォリオフィルター：タグによるフィルタリング機能
 * 
 * @param filter 現在選択されているフィルター
 * @param setFilter フィルター変更関数
 * @param tags 利用可能なタグ一覧
 */
function PortfolioFilter({ 
  filter, 
  setFilter, 
  tags 
}: { 
  filter: string | null; 
  setFilter: (tag: string | null) => void; 
  tags: string[] 
}) {
  return (
    <motion.div {...filterAnimation} className="flex flex-wrap justify-center gap-2 mb-10">
      <Badge
        variant={filter === null ? "default" : "outline"}
        className="cursor-pointer px-4 py-2 text-sm font-noto-sans-jp"
        onClick={() => setFilter(null)}
      >
        すべて
      </Badge>
      {tags.map(tag => (
        <Badge
          key={tag}
          variant={filter === tag ? "default" : "outline"}
          className="cursor-pointer px-4 py-2 text-sm font-noto-sans-jp"
          onClick={() => setFilter(tag)}
        >
          {tag}
        </Badge>
      ))}
    </motion.div>
  );
}

/**
 * ポートフォリオカード：個別のプロジェクトカードを表示
 * 
 * @param item ポートフォリオアイテムデータ
 * @param delay アニメーション遅延時間
 */
function PortfolioCard({ item, delay }: PortfolioCardProps) {
  return (
    <motion.div key={item.id} {...cardAnimation(delay)} className="h-full">
      <Link href={`/portfolio/${item.id}`} className="block group h-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          {/* サムネイル画像 */}
          <div className="relative h-48">
            <Image
              src={getPortfolioThumbnail(item.thumbnail, item.githubUrl)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          {/* コンテンツ */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold font-noto-sans-jp text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
              {item.description}
            </p>

            {/* フッター部分 */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{item.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* 詳細ボタン */}
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                詳細を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// =====================================
// Main Component
// =====================================
/**
 * ポートフォリオグリッドコンポーネント
 * プロジェクト一覧をグリッドレイアウトで表示し、フィルタリング機能を提供
 * 
 * @param showFilters フィルターの表示有無
 * @param maxItems 最大表示アイテム数
 * @param showButton 「すべての作品を見る」ボタンの表示有無
 * @param className 追加のCSSクラス 
 * @returns PortfolioGridコンポーネント
 */
export function PortfolioGrid({
  showFilters = false,
  maxItems,
  showButton = false,
  className = "",
}: PortfolioGridProps) {
  const [filter, setFilter] = useState<string | null>(null);

  // タグ一覧（重複を除去してソート）
  const allTags = Array.from(new Set(portfolioItems.flatMap(item => item.tags))).sort();

  // フィルタリング処理
  let filteredItems = filter
    ? portfolioItems.filter(item => item.tags.includes(filter))
    : portfolioItems;

  // 最大表示数の制限
  if (maxItems && filteredItems.length > maxItems) {
    filteredItems = filteredItems.slice(0, maxItems);
  }

  // アニメーション遅延を制限（最大5つまで0.1sずつ遅延）
  const getAnimationDelay = (index: number) => 0.1 * Math.min(index, 5);

  return (
    <div className={className}>
      {/* フィルター表示 */}
      {showFilters && <PortfolioFilter filter={filter} setFilter={setFilter} tags={allTags} />}

      {/* ポートフォリオグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <PortfolioCard key={item.id} item={item} delay={getAnimationDelay(index)} />
        ))}
      </div>

      {/* 「もっと見る」ボタン */}
      {showButton && maxItems && portfolioItems.length > maxItems && (
        <ViewAllButton
          href="/portfolio"
          text="すべての作品を見る"
        />
      )}
    </div>
  );
} 