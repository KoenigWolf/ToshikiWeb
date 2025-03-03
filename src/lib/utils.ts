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

// =====================================
// 日付関連のユーティリティ関数
// =====================================

/**
 * 日付文字列をフォーマットする関数
 * @param dateString - フォーマットする日付文字列（例: "2023-01-01"）
 * @returns フォーマットされた日付文字列（例: "2023年1月"）
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

/**
 * 期間の文字列から開始日を抽出する関数
 * @param periodString - 期間を表す文字列（例: "2020年4月 - 2022年3月"）
 * @returns 開始日のDate型オブジェクト
 */
export function extractStartDateFromPeriod(periodString: string): Date {
  const startDateStr = periodString.split(' - ')[0];
  const [year, month] = startDateStr.replace('年', '/').replace('月', '').split('/');
  return new Date(Number.parseInt(year), Number.parseInt(month) - 1);
}

// =====================================
// テキスト処理のユーティリティ関数
// =====================================

// truncateText関数は上部で既に定義されているため、ここでの重複定義を削除しました

// =====================================
// GitHub関連のユーティリティ関数
// =====================================

/**
 * GitHubリポジトリのURLからユーザー名とリポジトリ名を抽出する関数
 * @param githubUrl - GitHubリポジトリのURL
 * @returns ユーザー名とリポジトリ名のオブジェクト、または無効なURLの場合はnull
 */
export function extractGitHubInfo(githubUrl: string): { owner: string; repo: string } | null {
  if (!githubUrl) return null;
  
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== 'github.com') return null;
    
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) return null;
    
    return {
      owner: pathParts[0],
      repo: pathParts[1].replace('.git', '')
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    console.error('Invalid GitHub URL:', githubUrl);
    return null;
  }
}

/**
 * GitHubリポジトリからREADMEの画像URLを抽出する関数
 * @param owner - GitHubユーザー名/組織名
 * @param repo - リポジトリ名
 * @returns 画像URLの配列（デフォルトブランチのREADME.mdから抽出）
 */
export async function getGitHubReadmeImages(owner: string, repo: string): Promise<string[]> {
  try {
    // GitHubのREST APIを使用してREADMEを取得
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    
    if (!response.ok) {
      console.error(`Failed to fetch README: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    const content = atob(data.content); // Base64デコード
    
    // Markdown内の画像URLを抽出
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images: string[] = [];
    
    // 正規表現マッチを繰り返し処理
    let match: RegExpExecArray | null = imageRegex.exec(content);
    while (match !== null) {
      let imageUrl = match[1];
      
      // 相対パスの場合、GitHubの生のコンテンツURLに変換
      if (!imageUrl.startsWith('http')) {
        imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${imageUrl}`;
      }
      
      images.push(imageUrl);
      
      // 次のマッチを取得
      match = imageRegex.exec(content);
    }
    
    return images;
  } catch (error) {
    console.error('Error fetching GitHub README images:', error);
    return [];
  }
}

/**
 * GitHubリポジトリからリポジトリのスクリーンショット画像を生成するURL
 * @param owner - GitHubユーザー名/組織名
 * @param repo - リポジトリ名
 * @returns リポジトリのスクリーンショットURL
 */
export function getGitHubRepoScreenshot(owner: string, repo: string): string {
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

/**
 * GitHubリポジトリからサムネイル画像を生成する関数
 * @param githubUrl - GitHubリポジトリのURL
 * @returns サムネイル画像のURL、または無効なURLの場合はデフォルト画像
 */
export function generateGitHubThumbnail(githubUrl: string): string {
  const githubInfo = extractGitHubInfo(githubUrl);
  
  if (!githubInfo) {
    return '/portfolio/default-thumbnail.jpg';
  }
  
  return getGitHubRepoScreenshot(githubInfo.owner, githubInfo.repo);
}

/**
 * GitHubリポジトリから画像を自動取得する関数
 * @param githubUrl - GitHubリポジトリのURL
 * @param fallbackImages - 取得に失敗した場合のフォールバック画像配列
 * @returns 画像URLの配列
 */
export async function getImagesFromGitHub(
  githubUrl: string, 
  fallbackImages: string[] = []
): Promise<string[]> {
  if (!githubUrl) return fallbackImages;
  
  const githubInfo = extractGitHubInfo(githubUrl);
  if (!githubInfo) return fallbackImages;
  
  try {
    // READMEから画像を取得
    const readmeImages = await getGitHubReadmeImages(githubInfo.owner, githubInfo.repo);
    
    // リポジトリのスクリーンショットを追加
    const repoScreenshot = getGitHubRepoScreenshot(githubInfo.owner, githubInfo.repo);
    
    // 画像が見つからない場合はフォールバック画像を使用
    if (readmeImages.length === 0 && !repoScreenshot) {
      return fallbackImages;
    }
    
    // スクリーンショットを先頭に、READMEの画像を後ろに配置
    return [repoScreenshot, ...readmeImages];
  } catch (error) {
    console.error('Error getting images from GitHub:', error);
    return fallbackImages;
  }
}

/**
 * Portfolioアイテムのサムネイル画像URLを取得する関数
 * 空の場合はGitHubリポジトリのサムネイルを使用し、それもない場合はデフォルト画像を返す
 * @param thumbnail - 設定されているサムネイル画像URL
 * @param githubUrl - GitHubリポジトリのURL（オプション）
 * @returns サムネイル画像のURL
 */
export function getPortfolioThumbnail(thumbnail: string, githubUrl?: string): string {
  // サムネイルが設定されている場合はそれを使用
  if (thumbnail && thumbnail.trim() !== '') {
    return thumbnail;
  }
  
  // GitHubリポジトリのURLが設定されている場合はGitHubのサムネイルを使用
  if (githubUrl && githubUrl.trim() !== '') {
    return generateGitHubThumbnail(githubUrl);
  }
  
  // どちらも設定されていない場合はデフォルト画像を使用
  return '/portfolio/default-thumbnail.jpg';
}
