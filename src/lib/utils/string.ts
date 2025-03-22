// =====================================
// 文字列操作のユーティリティ
// =====================================

/**
 * テキストを指定された最大長で切り詰める
 * @param text 対象のテキスト
 * @param maxLength 最大長
 * @param suffix 省略記号（デフォルトは...）
 * @returns 切り詰められたテキスト
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}${suffix}`;
}

/**
 * シンプルな日付フォーマット関数
 * @deprecated 代わりに utils/date から formatDate を使用してください
 * @param date 日付オブジェクト
 * @param format フォーマットパターン
 * @returns フォーマットされた日付文字列
 */
export function formatSimpleDate(date: Date | string | number, format = 'YYYY/MM/DD'): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  let result = format.replace('YYYY', String(year));
  result = result.replace('MM', month);
  result = result.replace('DD', day);
  
  return result;
}

/**
 * ランダムなIDを生成する
 * @param length ID長さ
 * @returns ランダムなID文字列
 */
export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  
  return result;
}