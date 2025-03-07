"use client";

import { motion } from "framer-motion";

// =====================================
// Types
// =====================================
export interface SectionTitleProps {
  /**
   * セクションのタイトル
   */
  title: string;
  
  /**
   * セクションのサブタイトル（説明文）
   */
  subtitle?: string;
  
  /**
   * 中央揃えにするかどうか
   * @default true
   */
  centered?: boolean;
  
  /**
   * アニメーションのプロパティ
   */
  animationProps?: {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    whileInView?: Record<string, unknown>;
    transition?: Record<string, unknown>;
    viewport?: Record<string, unknown>;
  };
  
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

// =====================================
// セクションタイトルコンポーネント
// =====================================
/**
 * セクションタイトル - ページ内の各セクションのタイトルと説明を表示
 * 
 * Atomic Design:
 * - Molecule: 複数のAtomを組み合わせた再利用可能なコンポーネント
 * - 依存: motion.div (Library Component), HTML elements (h2, p)
 * 
 * @param {SectionTitleProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} セクションタイトルコンポーネント
 */
export function SectionTitle({
  title,
  subtitle,
  centered = true,
  animationProps,
  className = "",
}: SectionTitleProps) {
  // デフォルトのアニメーションプロパティ
  const defaultAnimationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };
  
  // アニメーションプロパティをマージ
  const mergedAnimationProps = {
    ...defaultAnimationProps,
    ...animationProps,
  };
  
  // スタイルクラスを構築
  const containerClasses = `${centered ? 'text-center' : ''} mb-12 ${className}`;
  
  return (
    <motion.div
      {...mergedAnimationProps}
      className={containerClasses}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-noto-sans-jp">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 