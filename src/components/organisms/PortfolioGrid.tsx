"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { getPortfolioThumbnail } from "@/lib/utils";

// =====================================
// Types
// =====================================
export interface PortfolioGridProps {
  showFilters?: boolean;
  maxItems?: number;
  showButton?: boolean;
  className?: string;
}

// =====================================
// ポートフォリオグリッドコンポーネント
// =====================================
export function PortfolioGrid({
  showFilters = false,
  maxItems,
  showButton = false,
  className = "",
}: PortfolioGridProps) {
  const [filter, setFilter] = useState<string | null>(null);
  
  // タグの一覧を取得（重複を除去）
  const allTags = Array.from(
    new Set(
      portfolioItems.flatMap(item => item.tags)
    )
  ).sort();
  
  // フィルタリングされたPortfolioアイテム（最大表示数の制限あり）
  let filteredItems = filter 
    ? portfolioItems.filter(item => item.tags.includes(filter))
    : portfolioItems;
    
  // 最大表示数が指定されている場合は制限
  if (maxItems && filteredItems.length > maxItems) {
    filteredItems = filteredItems.slice(0, maxItems);
  }

  return (
    <div className={className}>
      {/* フィルタータグ */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <Badge
            variant={filter === null ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm font-noto-sans-jp"
            onClick={() => setFilter(null)}
          >
            すべて
          </Badge>
          {allTags.map(tag => (
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
      )}

      {/* Portfolioグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
            className="h-full"
          >
            <Link href={`/portfolio/${item.id}`} className="block group h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={getPortfolioThumbnail(item.thumbnail, item.githubUrl)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold font-noto-sans-jp text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      詳細を見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* 「もっと見る」ボタン */}
      {showButton && maxItems && portfolioItems.length > maxItems && (
        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/portfolio">
              すべての作品を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
} 