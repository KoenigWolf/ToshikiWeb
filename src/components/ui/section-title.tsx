"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * セクションタイトルのプロパティ
 */
export interface SectionTitleProps {
  /**
   * メインタイトル
   */
  title: string;
  /**
   * サブタイトル（オプション）
   */
  subtitle?: string;
  /**
   * アニメーションを有効にするかどうか
   */
  animated?: boolean;
  /**
   * アニメーションの遅延（秒）
   */
  delay?: number;
  /**
   * センタリングするかどうか
   */
  centered?: boolean;
  /**
   * マージンの大きさ
   */
  spacing?: "sm" | "md" | "lg" | "xl";
  /**
   * 追加のクラス
   */
  className?: string;
}

/**
 * セクションタイトルコンポーネント
 * 
 * ページのセクションタイトルを一貫したデザインで表示します。
 * オプションでアニメーション効果を適用可能です。
 * 
 * @example
 * ```tsx
 * <SectionTitle
 *   title="About Us"
 *   subtitle="私たちについて"
 *   animated
 *   centered
 * />
 * ```
 */
export function SectionTitle({
  title,
  subtitle,
  animated = true,
  delay = 0,
  centered = true,
  spacing = "md",
  className,
}: SectionTitleProps) {
  // スペーシングのクラス
  const spacingClasses = {
    sm: "mb-4",
    md: "mb-8",
    lg: "mb-12",
    xl: "mb-16",
  };

  // コンテナのクラス
  const containerClassName = cn(
    spacingClasses[spacing],
    centered && "text-center",
    className
  );

  // タイトルのコンテンツ
  const titleContent = (
    <>
      {subtitle && (
        <p className="mb-2 text-sm font-medium tracking-wider uppercase text-primary">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold md:text-4xl font-noto-sans-jp">
        {title}
      </h2>
    </>
  );

  // アニメーション付きまたは静的なコンポーネントを返す
  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={containerClassName}
      >
        {titleContent}
      </motion.div>
    );
  }

  return <div className={containerClassName}>{titleContent}</div>;
} 