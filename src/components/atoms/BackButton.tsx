// --------------------------
// BackButton コンポーネント
// --------------------------
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// BackButtonProps: 戻るボタンのプロパティ定義
export interface BackButtonProps {
  onClick?: () => void;         // クリックハンドラー（未指定ならwindow.history.back）
  href?: string;                // リンク先パス（指定時はLinkコンポーネント使用）
  className?: string;           // 追加のスタイルクラス
  text?: string;                // ボタンに表示するテキスト
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"; // ボタンのバリアント
}

// BackButton コンポーネント: 前のページに戻るためのボタンを表示
export function BackButton({
  onClick,
  href,
  className = "mb-6",
  text = "戻る",
  variant = "ghost"
}: BackButtonProps) {
  // ボタン内に表示するコンテンツ（矢印アイコンとテキスト）
  const buttonContent = (
    <>
      <ArrowLeft className="w-4 h-4 mr-2" />
      {text}
    </>
  );

  // hrefが指定されている場合、Linkコンポーネントを使用してラップする
  if (href) {
    return (
      <Button variant={variant} className={`flex items-center gap-2 ${className}`} asChild>
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  // href未指定の場合は、onClickが指定されていなければwindow.history.backを使用
  return (
    <Button
      variant={variant}
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick || (() => window.history.back())}
    >
      {buttonContent}
    </Button>
  );
}
