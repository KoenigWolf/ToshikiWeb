
// GitHub APIクライアント

import type { GitHubRepoInfo, GitHubReadmeResponse } from './types';

/**
 * GitHubのURLからオーナー名とリポジトリ名を抽出する
 * 
 * @param githubUrl GitHub URLの形式（例: https://github.com/username/repo）
 * @returns オーナー名とリポジトリ名のオブジェクト、または無効なURLの場合はnull
 */
export function extractGitHubInfo(githubUrl: string): GitHubRepoInfo | null {
  if (!githubUrl || !githubUrl.includes('github.com')) {
    return null;
  }

  try {
    const url = new URL(githubUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) {
      return null;
    }
    
    return {
      owner: pathParts[0],
      repo: pathParts[1].replace('.git', ''),
    };
  } catch (error) {
    console.error('Error parsing GitHub URL:', error);
    return null;
  }
}

/**
 * GitHubリポジトリのREADMEから画像URLを取得する
 * 
 * @param owner リポジトリのオーナー名
 * @param repo リポジトリ名
 * @returns 画像URLの配列（Promise）
 */
export async function getGitHubReadmeImages(owner: string, repo: string): Promise<string[]> {
  try {
    // GitHub API からREADMEのコンテンツを取得
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }

    const data = await response.json() as GitHubReadmeResponse;
    const content = atob(data.content); // Base64エンコードされたコンテンツをデコード
    
    // 画像のURLを正規表現で抽出
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images: string[] = [];
    
    let match = imageRegex.exec(content);
    while (match !== null) {
      let imageUrl = match[1];
      
      // 相対パスの場合は絶対パスに変換
      if (!imageUrl.startsWith('http')) {
        if (imageUrl.startsWith('./')) {
          imageUrl = imageUrl.substring(2);
        }
        imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${imageUrl}`;
      }
      
      images.push(imageUrl);
      match = imageRegex.exec(content);
    }
    
    return images;
  } catch (error) {
    console.error('Error fetching GitHub README images:', error);
    return [];
  }
}

/**
 * GitHubリポジトリのスクリーンショットURLを生成する
 * 
 * @param owner リポジトリのオーナー名
 * @param repo リポジトリ名
 * @returns スクリーンショットのURL
 */
export function getGitHubRepoScreenshot(owner: string, repo: string): string {
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

/**
 * GitHubリポジトリから画像を取得し、取得できない場合はフォールバックを使用する
 * 
 * @param githubUrl GitHubリポジトリのURL
 * @param fallbackImages フォールバック用の画像URL配列
 * @returns 画像URLの配列（Promise）
 */
export async function getImagesFromGitHub(
  githubUrl: string, 
  fallbackImages: string[] = []
): Promise<string[]> {
  const repoInfo = extractGitHubInfo(githubUrl);
  if (!repoInfo) {
    return fallbackImages;
  }

  try {
    const images = await getGitHubReadmeImages(repoInfo.owner, repoInfo.repo);
    
    if (images.length === 0) {
      // READMEに画像がない場合はリポジトリのスクリーンショットを追加
      const screenshot = getGitHubRepoScreenshot(repoInfo.owner, repoInfo.repo);
      return [screenshot, ...fallbackImages];
    }
    
    return images;
  } catch (error) {
    console.error('Error getting images from GitHub:', error);
    // エラー時はフォールバック画像を使用
    return fallbackImages;
  }
}