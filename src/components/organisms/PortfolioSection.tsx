"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { portfolioItems } from "@/lib/data";
import { getPortfolioThumbnail } from "@/lib/utils";

// =====================================
// ポートフォリオ一覧セクションコンポーネント
// =====================================

export function PortfolioSection() {
  const [filter, setFilter] = useState<string | null>(null);
  
  // タグの一覧を取得（重複を除去）
  const allTags = Array.from(
    new Set(
      portfolioItems.flatMap(item => item.tags)
    )
  ).sort();
  
  // フィルタリングされたPortfolioアイテム
  const filteredItems = filter 
    ? portfolioItems.filter(item => item.tags.includes(filter))
    : portfolioItems;

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">Portfolio</h2>
        </motion.div>

        {/* フィルタータグ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
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

        {/* Portfolioグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Link href={`/portfolio/${item.id}`} className="block group">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={getPortfolioThumbnail(item.thumbnail, item.githubUrl)}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold font-noto-sans-jp text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 