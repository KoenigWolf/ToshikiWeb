"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { detailPageAnimations } from "@/lib/animations";
import type { ReactNode } from "react";


// 詳細ページのアニメーション付きコンテンツ

export interface DetailLayoutContentProps {
  /** ページのタイトル */
  title?: string;
  /** ページの説明（SEO用） */
  description?: string;
  /** 戻るボタンのテキスト */
  backText?: string;
  /** 子要素 */
  children: ReactNode;
  /** 戻るリンクのパス */
  backPath?: string;
  /** スキップアニメーション */
  skipAnimation?: boolean;
}

export function DetailLayoutContent({
  title,
  description,
  backText = "戻る",
  children,
  backPath,
  skipAnimation = false,
}: DetailLayoutContentProps) {
  const router = useRouter();

  // 戻るボタンの処理
  const handleBack = () => {
    if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          className="container px-4 mx-auto"
          initial={skipAnimation ? false : "hidden"}
          animate="visible"
          exit="exit"
          variants={detailPageAnimations.container}
        >
          <div className="max-w-3xl mx-auto">
            {/* 戻るボタン */}
            <motion.div
              variants={detailPageAnimations.item}
              className="mb-6"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backText}
              </Button>
            </motion.div>

            {/* タイトル（指定されている場合） */}
            {title && (
              <motion.h1
                variants={detailPageAnimations.item}
                className="mb-8 text-3xl font-bold text-center font-noto-sans-jp md:text-4xl"
              >
                {title}
              </motion.h1>
            )}

            {/* メインコンテンツ */}
            <motion.div 
              variants={detailPageAnimations.item}
              className="prose dark:prose-invert prose-img:rounded-lg prose-headings:font-noto-sans-jp prose-headings:mt-8 prose-headings:mb-4 max-w-none"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
} 