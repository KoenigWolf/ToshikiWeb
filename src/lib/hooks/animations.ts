// =====================================
// アニメーション共通設定
// =====================================
import type { Variants } from 'framer-motion';

// ---------------------------------------
// 基本アニメーション設定
// ---------------------------------------

/**
 * フェードインアニメーション
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

/**
 * スケールアニメーション
 */
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.5, 
    transition: { duration: 0.3 } 
  }
};

/**
 * スライドアップアニメーション
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96] 
    }
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    transition: { duration: 0.3 } 
  }
};

/**
 * コンテナ&子要素スタッガーアニメーション
 */
export const containerWithStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1
    } 
  }
};

// ---------------------------------------
// 詳細ページ用アニメーション
// ---------------------------------------

/**
 * 詳細ページ用アニメーション設定
 */
export const detailPageAnimations = {
  container: containerWithStagger,
  item: slideUp
};

// ---------------------------------------
// フェードインアップアニメーション用関数
// ---------------------------------------

/**
 * Framer Motionフェードインアップアニメーション用プロパティを生成
 * @param delay 遅延時間（秒）
 * @param duration アニメーション時間（秒）
 * @returns アニメーションプロパティ
 */
export function getFadeInUpProps(delay = 0, duration = 0.5) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
}

/**
 * Viewport用のフェードインアップアニメーションプロパティを生成（表示領域に入った時に発火）
 * @param delay 遅延時間（秒）
 * @param duration アニメーション時間（秒）
 * @returns アニメーションプロパティ（viewport用）
 */
export function getViewportFadeInUpProps(delay = 0, duration = 0.5) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    viewport: { once: true, margin: "-20px" }
  };
} 