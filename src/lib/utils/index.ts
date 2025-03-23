
// ユーティリティ関数のエクスポート


// 文字列操作関連
export { 
  truncateText,
  formatSimpleDate, // 互換性のために維持
  generateId 
} from './string';

// 日付操作関連
export { 
  formatDate,
  parseJapaneseDate,
  parsePeriod,
  extractStartDateFromPeriod,
  formatJapaneseDate,
  getYearsBetween,
  getRelativeTimeString
} from './date';

// バリデーション関連
export {
  hasValue,
  isValidEmail,
  isValidUrl,
  isValidJapanesePhoneNumber,
  isInRange,
  isValidLength,
  isValidJapanesePostalCode
} from './validation';

// スタイル関連
export * from './styles';

// 配列操作関連
export * from './array';

// スクロール操作関連
export * from './scroll';