// =====================================
// フェードインアップアニメーション用Hook
// =====================================

import type { MotionProps } from "framer-motion";

export type FadeInUpAnimationProps = {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: { duration: number; delay: number };
};

export type ViewportFadeInUpAnimationProps = {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean };
  transition: { duration: number; delay: number };
};

/**
 * フェードインアップアニメーションのpropsを生成するカスタムフック
 * 
 * @param delay アニメーションの遅延時間（秒）
 * @param duration アニメーションの継続時間（秒）
 * @returns Framer Motionのアニメーションprops
 */
export function useFadeInUp(
  delay = 0,
  duration = 0.5
): FadeInUpAnimationProps {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay },
  };
}

/**
 * ビューポート内に入った時のフェードインアップアニメーションのpropsを生成するカスタムフック
 * 
 * @param delay アニメーションの遅延時間（秒）
 * @param duration アニメーションの継続時間（秒）
 * @returns Framer Motionのアニメーションprops
 */
export function useViewportFadeInUp(
  delay = 0,
  duration = 0.5
): ViewportFadeInUpAnimationProps {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration, delay },
  };
}