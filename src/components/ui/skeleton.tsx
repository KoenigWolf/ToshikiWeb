import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * コンテンツのロード中に表示するスケルトンコンポーネント
 * 
 * @param props.className - 追加のCSSクラス
 * @param props.variant - スケルトンの表示バリエーション
 * @param props.aria-label - スクリーンリーダー用のラベル（推奨）
 */
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: "default" | "card" | "circle" | "text"
}

export function Skeleton({ 
  className, 
  variant = "default",
  ...props 
}: SkeletonProps) {
  const variantClasses = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    circle: "h-12 w-12 rounded-full",
    text: "h-4 w-2/3",
  }

  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-primary/10",
        variantClasses[variant],
        className
      )}
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  )
} 