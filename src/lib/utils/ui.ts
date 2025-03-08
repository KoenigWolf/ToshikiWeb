// =====================================
// UI構築のための汎用ユーティリティ関数
// =====================================
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSのクラス名を結合するユーティリティ関数
 * clsxとtailwind-mergeを組み合わせて、条件付きクラスと
 * Tailwindのクラスの衝突を解決します
 * 
 * @param inputs 結合するクラス名（文字列、オブジェクト、配列など）
 * @returns 最適化されたクラス名の文字列
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * テキストを指定した長さで切り詰める関数
 * 
 * @param text 切り詰めるテキスト
 * @param maxLength 最大長
 * @param suffix 省略記号（デフォルト：...）
 * @returns 切り詰められたテキスト
 */
export function truncateText(text: string, maxLength: number, suffix = "..."): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
}

/**
 * 配列を指定したサイズのチャンクに分割する
 * 
 * @param array 分割する配列
 * @param size チャンクサイズ
 * @returns 分割された配列の配列
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
} 