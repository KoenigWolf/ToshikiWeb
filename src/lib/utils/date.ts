// =====================================
// 日付処理のための汎用ユーティリティ関数
// =====================================

/**
 * 日本語の日付文字列をDate型に変換する関数
 * 例: "2023年1月" → Date
 * 
 * @param japaneseDate 日本語形式の日付文字列（例: "2023年1月"）
 * @returns 変換されたDateオブジェクト
 */
export function parseJapaneseDate(japaneseDate: string): Date {
  // "2023年1月" → ["2023", "1", ""]
  const parts = japaneseDate.split(/[年月日]/).filter(part => part);
  
  // 年月のみの場合は月初を、年月日がある場合はその日を設定
  if (parts.length === 2) {
    return new Date(Number.parseInt(parts[0], 10), Number.parseInt(parts[1], 10) - 1, 1);
  } 
  
  if (parts.length === 3) {
    return new Date(
      Number.parseInt(parts[0], 10), 
      Number.parseInt(parts[1], 10) - 1, 
      Number.parseInt(parts[2], 10)
    );
  }
  
  throw new Error(`Invalid date format: ${japaneseDate}`);
}

/**
 * 期間文字列を解析する関数
 * 例: "2020年4月 - 2021年3月" または "2020年4月 - 現在"
 * 
 * @param periodString 期間を表す文字列
 * @returns 開始日と終了日のオブジェクト
 */
export function parsePeriod(periodString: string) {
  const [startString, endString] = periodString.split(' - ');
  const startDate = parseJapaneseDate(startString);
  
  let endDate: Date | null = null;
  if (endString !== '現在') {
    endDate = parseJapaneseDate(endString);
  }
  
  return { startDate, endDate };
}

/**
 * 日付を読みやすい形式にフォーマットする
 * 
 * @param dateString フォーマットする日付文字列
 * @returns 整形された日付文字列
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 期間文字列から開始日を抽出する
 * 
 * @param periodString 期間を表す文字列（例: "2020年4月 - 2021年3月"）
 * @returns 開始日のDateオブジェクト
 */
export function extractStartDateFromPeriod(periodString: string): Date {
  const parts = periodString.split(' - ');
  if (parts.length !== 2) {
    throw new Error(`Invalid period format: ${periodString}`);
  }
  
  return parseJapaneseDate(parts[0]);
} 