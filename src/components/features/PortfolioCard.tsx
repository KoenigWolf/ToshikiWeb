"use client";


// ポートフォリオカードコンポーネント


import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useFadeInUp } from "@/hooks/common/use-fade-in-up";
import { getPortfolioThumbnail } from "@/lib/api/github";
import type { PortfolioItem } from "@/lib/types/portfolio";
import { cn } from "@/lib/utils";

export interface PortfolioCardProps {
  /** ポートフォリオアイテム */
  item: PortfolioItem;
  /** アニメーション遅延時間（秒） */
  delay?: number;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * ポートフォリオカード：個別のプロジェクトカードを表示
 */
export function PortfolioCard({ 
  item, 
  delay = 0,
  className = ""
}: PortfolioCardProps) {
  const animation = useFadeInUp(delay);

  return (
    <motion.div {...animation} className={className}>
      <Link href={`/portfolio/${item.id}`} className="block h-full group">
        <Card className={cn(
          "h-full transition-all duration-300 hover:shadow-lg", 
          "group"
        )}>
          {/* サムネイル画像 */}
          <div className="relative h-48">
            <Image
              src={getPortfolioThumbnail(item.thumbnail, item.githubUrl)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 transition-colors duration-300 bg-black/0 group-hover:bg-black/20" />
          </div>

          {/* コンテンツ */}
          <CardContent className="flex flex-col flex-grow p-4">
            <h3 className={cn(
              "mb-2 text-lg font-semibold font-noto-sans-jp",
              "transition-colors duration-300 group-hover:text-primary"
            )}>
              {item.title}
            </h3>
            <p className="flex-grow mb-4 text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </CardContent>

          {/* フッター部分 */}
          <CardFooter className="flex items-center justify-between p-4 pt-0">
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary/80"
            >
              詳細を見る
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}