// =====================================
// GitHub関連の型定義
// =====================================

/**
 * GitHubリポジトリ情報
 */
export interface GitHubRepoInfo {
  owner: string;
  repo: string;
}

/**
 * GitHubのREADMEレスポンス
 */
export interface GitHubReadmeResponse {
  content: string;
  encoding: string;
}