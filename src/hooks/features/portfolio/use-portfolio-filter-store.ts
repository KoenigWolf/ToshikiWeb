// =====================================
// ポートフォリオフィルター状態管理
// =====================================

import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { PortfolioItem } from "@/lib/types/portfolio";

// フィルタリングのディレイ(ms)
const FILTER_DEBOUNCE_DELAY = 300;

interface PortfolioFilterState {
  // 状態
  items: PortfolioItem[];
  filter: string | null;
  maxItems?: number;
  isFilterDebouncing: boolean;
  filteredItemsCache: {
    filter: string | null;
    maxItems?: number;
    result: PortfolioItem[];
  } | null;

  // アクション
  setItems: (items: PortfolioItem[]) => void;
  setFilter: (filter: string | null) => void;
  setMaxItems: (maxItems?: number) => void;
  viewAll: () => void;
  resetCache: () => void;
  
  // 内部用（キャッシュを安全に更新するため）
  _updateFilteredItemsCache: (cache: PortfolioFilterState['filteredItemsCache']) => void;
}

interface PortfolioFilterComputed {
  // 算出プロパティ
  filteredItems: PortfolioItem[];
  allTags: string[];
  hasMore: boolean;
  uniqueTagCount: number;
}

type PortfolioFilterStore = PortfolioFilterState & PortfolioFilterComputed;

const storeCreator: StateCreator<PortfolioFilterStore> = (set, get) => ({
  // 初期状態
  items: [],
  filter: null,
  maxItems: undefined,
  isFilterDebouncing: false,
  filteredItemsCache: null,

  // アクション
  setItems: (items: PortfolioItem[]) => {
    // アイテムが変更されたら、キャッシュをリセット
    set({ 
      items, 
      filteredItemsCache: null 
    });
  },
  
  setFilter: (filter: string | null) => {
    const currentFilter = get().filter;
    
    // 同じフィルタが設定された場合は何もしない
    if (filter === currentFilter) return;
    
    // フィルタ変更時にdebounceを設定
    set({ isFilterDebouncing: true });
    
    // debounceを使用して頻繁なフィルタリングを防止
    setTimeout(() => {
      set({ 
        filter,
        isFilterDebouncing: false,
        filteredItemsCache: null // キャッシュをリセット
      });
    }, FILTER_DEBOUNCE_DELAY);
  },
  
  setMaxItems: (maxItems?: number) => set({ 
    maxItems,
    filteredItemsCache: null // キャッシュをリセット
  }),
  
  viewAll: () => set({ 
    maxItems: undefined,
    filteredItemsCache: null
  }),
  
  resetCache: () => set({ filteredItemsCache: null }),
  
  // 内部用 - フィルタリング結果のキャッシュを安全に更新
  _updateFilteredItemsCache: (cache) => set({ filteredItemsCache: cache }),

  // 算出値
  get filteredItems() {
    const { items, filter, maxItems, isFilterDebouncing, filteredItemsCache, _updateFilteredItemsCache } = get();
    
    // debounce中は最後の結果を返す
    if (isFilterDebouncing && filteredItemsCache) {
      return filteredItemsCache.result;
    }
    
    // キャッシュがあり、同じフィルタリング条件の場合はキャッシュから返す
    if (
      filteredItemsCache && 
      filteredItemsCache.filter === filter && 
      filteredItemsCache.maxItems === maxItems
    ) {
      return filteredItemsCache.result;
    }
    
    // フィルタリング実行
    let filtered = filter
      ? items.filter(item => item.tags.includes(filter))
      : items;

    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }
    
    // 結果をキャッシュに保存（非同期で状態を更新）
    const newCache = {
      filter,
      maxItems,
      result: filtered
    };
    
    // 次回レンダリングでキャッシュを更新するために setTimeout を使用
    // これにより現在のゲッター呼び出し中に状態が更新されるのを防ぐ
    setTimeout(() => {
      _updateFilteredItemsCache(newCache);
    }, 0);

    return filtered;
  },

  get allTags() {
    const { items } = get();
    return Array.from(new Set(items.flatMap(item => item.tags))).sort();
  },

  get hasMore() {
    const { items, filteredItems, maxItems } = get();
    return maxItems ? items.length > filteredItems.length : false;
  },
  
  get uniqueTagCount() {
    return get().allTags.length;
  }
});

export const usePortfolioFilterStore = create<PortfolioFilterStore>()(storeCreator);