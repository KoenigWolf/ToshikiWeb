"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useFadeInUp } from "@/hooks/use-fade-in-up";
import { getPortfolioThumbnail } from "@/lib/api/github";
import type { PortfolioItem } from "@/lib/types/portfolio";

export interface PortfolioCardProps {
  item: PortfolioItem;
  delay?: number;
  className?: string;
}

// ポートフォリオの個別カードコンポーネント
export function PortfolioCard({ item, delay = 0, className = "" }: PortfolioCardProps) {
  const animation = useFadeInUp(delay); // フェードインアニメーション

  return (
    <motion.div {...animation} className={className}>
      {/* カード全体がリンク */}
      <Card className="flex flex-col h-full transition-all duration-300 group hover:shadow-lg">
        <Link href={`/portfolio/${item.id}`} aria-label={`${item.title}の詳細を見る`} className="flex flex-col h-full">
          
          {/* サムネイル画像 */}
          <div className="relative w-full h-48 overflow-hidden rounded-lg">
            <Image
              src={getPortfolioThumbnail(item.image || "", item.githubUrl)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* ホバー時の黒フィルター */}
            <div className="absolute inset-0 transition-colors duration-300 bg-black/0 group-hover:bg-black/20" />
          </div>

          {/* タイトル & 説明 */}
          <CardContent className="flex flex-col flex-grow p-4">
            <h3 className="mb-2 text-lg font-semibold transition-colors font-noto-sans-jp group-hover:text-primary">
              {item.title}
            </h3>
            <p className="flex-grow mb-4 text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </CardContent>

          <CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
            {/* タグ（2つまで + 他の件数表示） */}
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
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
}
