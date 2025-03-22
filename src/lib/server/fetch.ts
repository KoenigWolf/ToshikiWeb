/**
 * サーバーサイドのデータフェッチユーティリティ
 * Next.jsのキャッシュ機能を活用した効率的なデータ取得
 */

import 'server-only';
import { cache } from 'react';
import { revalidatePath, revalidateTag } from 'next/cache';

// =====================================
// 型定義
// =====================================

/**
 * データキャッシュのオプション
 */
export type FetchOptions = {
  /** キャッシュ時間（秒） */
  cacheDuration?: number;
  /** サーバーでのみ実行するか */
  serverOnly?: boolean;
  /** タグ（キャッシュ再検証用） */
  tags?: string[];
  /** 認証情報を含めるか */
  includeCredentials?: boolean;
};

/**
 * キャッシュオプション
 */
export type CacheOptions = {
  /** キャッシュタグ */
  tags?: string[];
  /** デフォルト値 */
  defaultValue?: unknown;
  /** リクエストオプション */
  fetchOptions?: RequestInit;
};

// =====================================
// 関数
// =====================================

/**
 * データを取得する関数
 * Next.jsのキャッシュ機能を活用したデータフェッチ
 */
export async function fetchData<T>(
  url: string, 
  options: FetchOptions = {}
): Promise<T> {
  const { 
    cacheDuration = 60 * 60, // デフォルト1時間
    serverOnly = false,
    tags = [],
    includeCredentials = true
  } = options;

  try {
    const res = await fetch(url, {
      // サーバーでのみ実行する場合は force-cache を使用
      next: {
        revalidate: cacheDuration,
        tags: tags.length > 0 ? tags : undefined,
      },
      // クライアントサイドで認証情報を含める（デフォルト）
      ...(typeof window !== 'undefined' && includeCredentials ? { credentials: 'include' } : {})
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json() as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

/**
 * サーバーサイド専用でキャッシュされるフェッチ関数
 * React Server Componentsと組み合わせて使用
 */
export const fetchWithCache = cache(async <T>(
  url: string,
  options: CacheOptions = {}
): Promise<T> => {
  const { 
    tags = [], 
    defaultValue,
    fetchOptions = {}
  } = options;

  try {
    const res = await fetch(url, {
      next: {
        tags: tags.length > 0 ? tags : undefined,
      },
      ...fetchOptions
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json() as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    
    // デフォルト値が指定されている場合は返す
    if (defaultValue !== undefined) {
      return defaultValue as T;
    }
    
    throw error;
  }
});

/**
 * 指定したタグのキャッシュを再検証する
 * @param tag キャッシュタグ
 */
export function revalidateDataByTag(tag: string): void {
  try {
    revalidateTag(tag);
  } catch (error) {
    console.error(`Error revalidating tag ${tag}:`, error);
  }
}

/**
 * 指定したパスのキャッシュを再検証する
 * @param path パス
 */
export function revalidateDataByPath(path: string): void {
  try {
    revalidatePath(path);
  } catch (error) {
    console.error(`Error revalidating path ${path}:`, error);
  }
}

/**
 * キャッシュを再検証する関数
 * @param path 再検証するパス
 * @param secret 認証シークレット（オプション）
 */
export async function revalidateData(
  path: string, 
  secret?: string
): Promise<{success: boolean; message?: string}> {
  try {
    const headers: HeadersInit = {};
    if (secret) {
      headers.Authorization = `Bearer ${secret}`;
    }

    const res = await fetch(`/api/revalidate?path=${encodeURIComponent(path)}`, {
      method: 'POST',
      headers
    });

    const data = await res.json();
    
    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'キャッシュの再検証に失敗しました'
      };
    }

    return { 
      success: true 
    };
  } catch (error) {
    console.error("Error revalidating data:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '不明なエラーが発生しました'
    };
  }
} 