import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// =====================================
// 戻るボタンコンポーネント
// Atomic Design: Atom - 単一の機能を持つ最小単位のUIコンポーネント
// =====================================

export interface BackButtonProps {
  /** クリック時のハンドラー（指定がなければwindow.history.backを使用） */
  onClick?: () => void;
  
  /** リンク先のパス（指定した場合はLinkコンポーネントを使用） */
  href?: string;
  
  /** 追加のスタイルクラス */
  className?: string;
  
  /** ボタンのテキスト */
  text?: string;
  
  /** ボタンのバリアント */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

/**
 * 戻るボタン - 前のページに戻るための共通ボタン
 * @param props コンポーネントのプロパティ
 * @returns BackButtonコンポーネント
 */
export function BackButton({
  onClick,
  href,
  className = "mb-6",
  text = "戻る",
  variant = "ghost"
}: BackButtonProps) {
  const buttonContent = (
    <>
      <ArrowLeft className="h-4 w-4 mr-2" />
      {text}
    </>
  );

  // hrefが指定されている場合はLinkを使用
  if (href) {
    return (
      <Button 
        variant={variant} 
        className={`flex items-center gap-2 ${className}`}
        asChild
      >
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  // それ以外の場合は通常のボタン
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