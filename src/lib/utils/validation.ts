
// バリデーション関連のユーティリティ


/**
 * 値が存在するかチェックする
 * nullやundefined、空文字列、空配列、空オブジェクトでない場合にtrueを返す
 */
export function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === 'object' && Object.keys(value as object).length === 0) return false;
  return true;
}

/**
 * 値が有効なメールアドレスかチェックする
 * @param email チェック対象のメールアドレス
 * @returns 有効なメールアドレスの場合はtrue
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  // RFC 5322に準拠した基本的なメールアドレスのパターン
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailPattern.test(email);
}

/**
 * 値が有効なURL形式かチェックする
 * @param url チェック対象のURL
 * @returns 有効なURLの場合はtrue
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    // URLコンストラクタを使って検証
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (error) {
    return false;
  }
}

/**
 * 値が有効な日本の電話番号形式かチェックする
 * @param phoneNumber チェック対象の電話番号
 * @returns 有効な電話番号の場合はtrue
 */
export function isValidJapanesePhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;
  
  // 日本の電話番号パターン（ハイフンあり・なしの両方に対応）
  const phonePattern = /^(0[0-9]{1,4}-[0-9]{1,4}-[0-9]{3,4}|0[0-9]{9,10})$/;
  return phonePattern.test(phoneNumber);
}

/**
 * 値が指定された最小・最大値の範囲内かチェックする
 * @param value チェック対象の値
 * @param min 最小値
 * @param max 最大値
 * @returns 範囲内の場合はtrue
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * 文字列が指定された長さの範囲内かチェックする
 * @param str チェック対象の文字列
 * @param minLength 最小長
 * @param maxLength 最大長
 * @returns 範囲内の場合はtrue
 */
export function isValidLength(str: string, minLength: number, maxLength: number): boolean {
  if (!str) return minLength === 0;
  return str.length >= minLength && str.length <= maxLength;
}

/**
 * 値が日本の郵便番号形式（3桁-4桁）かチェックする
 * @param postalCode チェック対象の郵便番号
 * @returns 有効な郵便番号の場合はtrue
 */
export function isValidJapanesePostalCode(postalCode: string): boolean {
  if (!postalCode) return false;
  
  // 日本の郵便番号パターン（XXX-XXXX形式）
  const postalPattern = /^\d{3}-\d{4}$/;
  // ハイフンなしの場合（7桁連続）
  const postalPatternNoHyphen = /^\d{7}$/;
  
  return postalPattern.test(postalCode) || postalPatternNoHyphen.test(postalCode);
} 