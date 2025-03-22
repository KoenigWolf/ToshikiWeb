// =====================================
// GitHub API機能のエクスポート
// =====================================

// 型定義のエクスポート
export * from './types';

// クライアント関数のインポートと再エクスポート
export {
  extractGitHubInfo,
  getGitHubReadmeImages,
  getGitHubRepoScreenshot,
  getImagesFromGitHub,
} from './client';

// ユーティリティ関数
export function generateGitHubThumbnail(githubUrl: string): string {
  if (!githubUrl || !githubUrl.includes('github.com')) {
    return '/portfolio/default-thumbnail.svg';
  }

  try {
    const url = new URL(githubUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) {
      return '/portfolio/default-thumbnail.svg';
    }
    
    const owner = pathParts[0];
    const repo = pathParts[1].replace('.git', '');
    
    return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
  } catch (error) {
    console.error('Error generating GitHub thumbnail:', error);
    return '/portfolio/default-thumbnail.svg';
  }
}

/**
 * ポートフォリオ項目のサムネイル画像を取得する
 * 
 * @param thumbnail 設定されたサムネイル画像のパス
 * @param githubUrl GitHubリポジトリのURL（オプション）
 * @returns 使用するサムネイル画像のURL
 */
export function getPortfolioThumbnail(thumbnail: string, githubUrl?: string): string {
  // カスタムサムネイルがある場合はそれを優先
  if (thumbnail && thumbnail !== '') {
    return thumbnail;
  }
  
  // GitHubのURLがある場合はGitHubのスクリーンショットを生成
  if (githubUrl) {
    return generateGitHubThumbnail(githubUrl);
  }
  
  // どちらもない場合はデフォルト画像
  return '/portfolio/default-thumbnail.svg';
}