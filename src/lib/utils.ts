// =====================================
// アプリケーション全体で使用するユーティリティ関数を提供するファイル
// =====================================
// このファイルには、UI構築、データ処理、日付操作などの
// 汎用的なヘルパー関数が含まれています。

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// =====================================
// Tailwind CSSのクラス名を結合するユーティリティ関数
// =====================================
// clsxとtailwind-mergeを組み合わせて、条件付きクラスと
// Tailwindのクラスの衝突を解決します
// 
// @param inputs 結合するクラス名（文字列、オブジェクト、配列など）
// @returns 最適化されたクラス名の文字列
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// =====================================
// 日本語の日付文字列をDate型に変換する関数
// =====================================
// 例: "2023年1月" → Date
// 
// @param japaneseDate 日本語形式の日付文字列（例: "2023年1月"）
// @returns 変換されたDateオブジェクト
export function parseJapaneseDate(japaneseDate: string): Date {
  // "2023年1月" → ["2023", "1", ""]
  const parts = japaneseDate.split(/年|月|日/).filter(Boolean);
  
  const year = Number.parseInt(parts[0], 10);
  const month = parts.length > 1 ? Number.parseInt(parts[1], 10) - 1 : 0; // JavaScriptの月は0始まり
  const day = parts.length > 2 ? Number.parseInt(parts[2], 10) : 1;
  
  return new Date(year, month, day);
}

// =====================================
// 期間文字列から開始日と終了日を抽出する関数
// =====================================
// 例: "2023年1月 ～ 2024年3月" → { start: Date, end: Date }
// 
// @param periodString 期間を表す文字列（例: "2023年1月 ～ 2024年3月"）
// @returns 開始日と終了日を含むオブジェクト
export function parsePeriod(periodString: string) {
  const [startStr, endStr] = periodString.split('～').map(s => s.trim());
  
  const start = parseJapaneseDate(startStr);
  const end = endStr ? parseJapaneseDate(endStr) : null;
  
  return { start, end };
}

// =====================================
// 文字列を指定された長さに切り詰め、省略記号を追加する関数
// =====================================
// @param text 切り詰める文字列
// @param maxLength 最大長
// @param suffix 省略記号（デフォルト: "..."）
// @returns 切り詰められた文字列
export function truncateText(text: string, maxLength: number, suffix = "..."): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
}

// =====================================
// 配列をチャンク（固定サイズの小さな配列）に分割する関数
// =====================================
// @param array 分割する配列
// @param size チャンクのサイズ
// @returns チャンクの配列
export function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}
