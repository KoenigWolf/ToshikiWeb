
// スクロール関連のユーティリティ関数


/**
 * スクロール位置を保存・復元するためのユーティリティ
 */
export const scrollUtils = {
  /**
   * スクロール位置を保存
   * @param key 保存するキー（デフォルト: 'scrollPosition'）
   */
  saveScrollPosition: (key = 'scrollPosition') => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, window.scrollY.toString());
  },
  
  /**
   * スクロール位置を復元
   * @param key 復元するキー（デフォルト: 'scrollPosition'）
   */
  restoreScrollPosition: (key = 'scrollPosition') => {
    if (typeof window === 'undefined') return;
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition, 10));
      sessionStorage.removeItem(key);
    }
  }
};

/**
 * 指定された要素にスムーズにスクロールする
 * @param elementId スクロール先の要素ID
 * @param offset スクロール位置のオフセット（ピクセル）
 */
export function scrollToElement(elementId: string, offset = 0): void {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth'
  });
} 