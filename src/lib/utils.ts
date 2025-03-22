import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名を結合するユーティリティ
 * @deprecated このクラスは utils/styles.ts の cn に移行しました
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 文字列を省略して表示するユーティリティ
 * @param str 元の文字列
 * @param maxLength 最大長
 * @param suffix 省略記号（デフォルト: ...）
 * @deprecated このクラスは utils/string.ts の truncateText に移行しました
 */
export function truncateString(str: string, maxLength: number, suffix = '...'): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * 日付をフォーマットするユーティリティ
 * @param date 日付またはタイムスタンプ
 * @param options 日付フォーマットオプション
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('ja-JP', options).format(d);
}

/**
 * ランダムIDを生成するユーティリティ
 * @param length ID長（デフォルト: 8）
 */
export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * 配列をシャッフルするユーティリティ
 * @param array シャッフルする配列
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

/**
 * スクロール位置を保存・復元するためのユーティリティ
 */
export const scrollUtils = {
  // スクロール位置を保存
  saveScrollPosition: (key = 'scrollPosition') => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, window.scrollY.toString());
  },
  
  // スクロール位置を復元
  restoreScrollPosition: (key = 'scrollPosition') => {
    if (typeof window === 'undefined') return;
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition, 10));
      sessionStorage.removeItem(key);
    }
  }
}; 