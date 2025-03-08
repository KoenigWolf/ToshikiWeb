// =====================================
// 技術バッジコンポーネント
// 使用技術やスキルを表示するためのラベル
// Atomic Design: Atom - 単一の機能を持つ最小単位のUIコンポーネント
// =====================================

/**
 * 技術名を表示するバッジコンポーネント
 * @param props.tech - 表示する技術名
 * @param props.className - 追加のスタイルクラス
 * @returns TechnologyBadgeコンポーネント
 */
export interface TechnologyBadgeProps {
  /** 表示する技術名 */
  tech: string;
  
  /** 追加のスタイルクラス */
  className?: string;
}

export function TechnologyBadge({ tech, className = "" }: TechnologyBadgeProps) {
  return (
    <span className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm ${className}`}>
      {tech}
    </span>
  );
} 