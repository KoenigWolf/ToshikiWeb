// =====================================
// フェードインアップアニメーション用Hook
// =====================================

import type { MotionProps } from "framer-motion";
import { useState, useEffect } from 'react';
import { getFadeInUpProps, getViewportFadeInUpProps } from '../animations';

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
 * フェードインアップアニメーション用のカスタムフック
 * 
 * @param delay アニメーションの開始遅延（秒）
 * @param duration アニメーションの継続時間（秒）
 * @param forceDisable アニメーションを無効化するフラグ
 * @returns Framer Motionプロパティ
 */
export function useFadeInUp(
  delay = 0, 
  duration = 0.5,
  forceDisable = false
) {
  const [isClient, setIsClient] = useState(false);
  
  // サーバーサイドレンダリング対応
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // SSR時やアニメーション無効時はプロパティを返さない
  if (!isClient || forceDisable) {
    return {};
  }
  
  return getFadeInUpProps(delay, duration);
}

/**
 * ビューポート内に入った時にフェードインアップするアニメーション用のカスタムフック
 * 
 * @param delay アニメーションの開始遅延（秒）
 * @param duration アニメーションの継続時間（秒）
 * @param forceDisable アニメーションを無効化するフラグ
 * @returns Framer Motionプロパティ
 */
export function useViewportFadeInUp(
  delay = 0, 
  duration = 0.5,
  forceDisable = false
) {
  const [isClient, setIsClient] = useState(false);
  
  // サーバーサイドレンダリング対応
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // SSR時やアニメーション無効時はプロパティを返さない
  if (!isClient || forceDisable) {
    return {};
  }
  
  return getViewportFadeInUpProps(delay, duration);
} 