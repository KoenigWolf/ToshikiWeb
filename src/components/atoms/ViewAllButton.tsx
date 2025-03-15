// 「すべての作品を見る」ボタンコンポーネント
// ポートフォリオや実績の詳細ページへ誘導するCTAボタン
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface ViewAllButtonProps {
  // リンク先のパス
  href: string;
  // ボタンに表示するテキスト
  text: string;
  // ボタンサイズ ("default", "sm", "lg", "icon")
  size?: "default" | "sm" | "lg" | "icon";
  // 追加のクラス名
  className?: string;
}

export function ViewAllButton({ href, text, size = "default", className = "" }: ViewAllButtonProps) {
  // 外側のコンテナは中央揃えと上部の余白を設定
  return (
    <div className={`mt-8 text-center ${className}`}>
      {/* ButtonコンポーネントにasChildでLinkをラップし、カスタムボタンを実現 */}
      <Button asChild size={size} className="font-noto-sans-jp">
        <Link href={href}>
          {text}
          {/* テキストと一緒に右側に矢印アイコンを表示 */}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </Button>
    </div>
  );
}
