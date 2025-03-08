import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// =====================================
// ViewAllButtonコンポーネント
// 「すべての作品を見る」ボタン
// Atomic Design: Atom - 単一の機能を持つ最小単位のUIコンポーネント
// =====================================
export interface ViewAllButtonProps {
  /**
   * リンク先のパス
   */
  href: string;
  
  /**
   * ボタンのテキスト
   */
  text: string;
  
  /**
   * ボタンサイズ
   */
  size?: "default" | "sm" | "lg" | "icon";
  
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * 「すべてを見る」タイプのボタン
 * ポートフォリオや実績など、もっと見るためのCTAボタン
 * 
 * @param props コンポーネントのプロパティ
 * @returns ViewAllButtonコンポーネント
 */
export function ViewAllButton({ 
  href, 
  text, 
  size = "default",
  className = ""
}: ViewAllButtonProps) {
  return (
    <div className={`mt-8 text-center ${className}`}>
      <Button asChild size={size} className="font-noto-sans-jp">
        <Link href={href}>
          {text}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
} 