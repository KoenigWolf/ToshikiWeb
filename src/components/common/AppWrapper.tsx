"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorBoundary } from "./ErrorBoundary";

interface AppWrapperProps {
  children: ReactNode;
}

/**
 * アプリケーション全体のラッパーコンポーネント
 * エラーバウンダリやアニメーションを提供する
 */
export function AppWrapper({ children }: AppWrapperProps) {
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          key="app-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
} 