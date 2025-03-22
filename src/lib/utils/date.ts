// =====================================
// 日付操作のユーティリティ関数
// =====================================

/**
 * 日付をフォーマットするユーティリティ
 * @param date 日付またはタイムスタンプ
 * @param options 日付フォーマットオプション
 * @returns フォーマットされた日付文字列
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

/**
 * 日付を「YYYY年MM月DD日」形式でフォーマットする
 * @param date 日付
 */
export function formatJapaneseDate(date: Date | string | number): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  return `${year}年${month}月${day}日`;
}

/**
 * 日付の間隔（年数）を計算する
 * @param startDate 開始日
 * @param endDate 終了日（デフォルトは現在）
 */
export function getYearsBetween(
  startDate: Date | string | number,
  endDate: Date | string | number = new Date()
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let years = end.getFullYear() - start.getFullYear();
  
  // 月と日も考慮して調整
  if (
    end.getMonth() < start.getMonth() ||
    (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
  ) {
    years--;
  }
  
  return years;
}

/**
 * 相対的な日付表現を取得する（例：「3日前」、「1週間前」など）
 * @param date 対象日
 * @param baseDate 基準日（デフォルトは現在）
 */
export function getRelativeTimeString(
  date: Date | string | number,
  baseDate: Date | string | number = new Date()
): string {
  const target = new Date(date);
  const base = new Date(baseDate);
  
  const diffMs = base.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  
  if (diffSec < 60) return `${diffSec}秒前`;
  
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}分前`;
  
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}時間前`;
  
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}日前`;
  
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7);
    return `${weeks}週間前`;
  }
  
  if (diffDay < 365) {
    const months = Math.floor(diffDay / 30);
    return `${months}ヶ月前`;
  }
  
  const years = Math.floor(diffDay / 365);
  return `${years}年前`;
}

// 月の名前を配列で定義
export const MONTH_NAMES = [
  '1月', '2月', '3月', '4月', '5月', '6月', 
  '7月', '8月', '9月', '10月', '11月', '12月'
];

// 曜日の名前を配列で定義
export const DAY_NAMES = [
  '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'
];

// 曜日の短縮名を配列で定義
export const SHORT_DAY_NAMES = [
  '日', '月', '火', '水', '木', '金', '土'
]; 