
// スタイル関連のユーティリティ関数

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