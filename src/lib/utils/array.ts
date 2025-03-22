// =====================================
// 配列操作のユーティリティ関数
// =====================================

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

/**
 * 配列をシャッフルするユーティリティ
 * Fisher-Yates アルゴリズムを使用
 * 
 * @param array シャッフルする配列
 * @returns シャッフルされた新しい配列
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}