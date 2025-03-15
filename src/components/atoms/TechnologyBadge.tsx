// 技術バッジコンポーネント
// 表示する技術やスキルのラベルとして機能する
export interface TechnologyBadgeProps {
  // 表示する技術名
  tech: string;
  // 追加のスタイルクラス
  className?: string;
}

export function TechnologyBadge({ tech, className = "" }: TechnologyBadgeProps) {
  // bg-gray-100/dark:bg-gray-800: テーマに応じた背景色
  // text-gray-800/dark:text-gray-200: テーマに応じた文字色
  // px-3 py-1: 内側の余白, rounded-full: 丸みのある角, text-sm: 小さい文字サイズ
  return (
    <span className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm ${className}`}>
      {tech}
    </span>
  );
}
