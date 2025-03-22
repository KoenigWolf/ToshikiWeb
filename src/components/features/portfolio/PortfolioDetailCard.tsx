"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioItem } from "@/lib/types/portfolio";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils";

interface PortfolioDetailCardProps {
  portfolio: PortfolioItem;
  isLoading?: boolean;
}

/**
 * PortfolioDetailCard コンポーネント
 * 
 * ポートフォリオの詳細情報を表示するためのカードコンポーネント。
 * プロジェクトタイトル、期間、使用技術、説明文、外部リンクなどを表示します。
 * 
 * @param props.portfolio - 表示するポートフォリオ情報
 * @param props.isLoading - ローディング状態
 */
export function PortfolioDetailCard({ portfolio, isLoading = false }: PortfolioDetailCardProps) {
  // アニメーション設定
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // ローディング状態の場合はスケルトンを表示
  if (isLoading) {
    return <PortfolioDetailSkeleton />;
  }

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      transition={variants.transition}
    >
      <Card className="overflow-hidden border shadow-md border-border/40">
        {/* プロジェクト画像 */}
        {portfolio.image && (
          <div className="relative w-full overflow-hidden aspect-video">
            <Image
              src={portfolio.image}
              alt={portfolio.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl font-bold font-noto-sans-jp">
            {portfolio.title}
          </CardTitle>
          
          {/* プロジェクト期間 */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(portfolio.period)}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 技術タグ */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">使用技術</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* プロジェクト説明 */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">プロジェクト概要</h3>
            <p className={cn(
              "leading-relaxed text-muted-foreground",
              "font-noto-sans-jp"
            )}>
              {portfolio.description}
            </p>
          </div>

          {/* 外部リンク */}
          {portfolio.url && (
            <div className="pt-4">
              <Link href={portfolio.url} target="_blank" rel="noopener noreferrer" passHref>
                <Button variant="default">
                  サイトを見る
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * PortfolioDetailSkeleton コンポーネント
 * 
 * ポートフォリオ詳細情報の読み込み中に表示するスケルトン
 */
function PortfolioDetailSkeleton() {
  return (
    <Card className="overflow-hidden border shadow-md">
      <Skeleton variant="card" className="w-full" aria-label="プロジェクト画像読み込み中" />
      
      <CardHeader>
        <Skeleton variant="text" className="w-2/3 h-8" aria-label="プロジェクトタイトル読み込み中" />
        <Skeleton className="w-1/3 h-4 mt-2" aria-label="プロジェクト期間読み込み中" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-1/4 h-4" aria-label="使用技術ラベル読み込み中" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton 
                key={`skill-skeleton-${crypto.randomUUID()}`} 
                className="w-20 h-6 rounded-full" 
                aria-label={`スキル${i + 1}読み込み中`} 
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Skeleton className="w-1/4 h-4" aria-label="概要ラベル読み込み中" />
          <Skeleton className="w-full h-4" aria-label="説明文読み込み中" />
          <Skeleton className="w-full h-4" aria-label="説明文読み込み中" />
          <Skeleton className="w-2/3 h-4" aria-label="説明文読み込み中" />
        </div>
        
        <Skeleton className="w-32 h-10 mt-4" aria-label="ボタン読み込み中" />
      </CardContent>
    </Card>
  );
} 