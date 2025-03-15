"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

// Avatarコンポーネント: アバター全体のルート要素を表示する
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    // AvatarPrimitive.Rootを使用して基本的なアバタースタイルを設定
    <AvatarPrimitive.Root
      data-slot="avatar" // デバッグやスタイル適用のための識別用属性
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full", // 基本スタイル: 固定サイズ、丸い形状
        className // 追加のカスタムクラスをマージ
      )}
      {...props} // その他のpropsを展開
    />
  )
}

// AvatarImageコンポーネント: アバター画像を表示する
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    // AvatarPrimitive.Imageを使用して画像のスタイルを設定
    <AvatarPrimitive.Image
      data-slot="avatar-image" // 識別用のdata-slot属性
      className={cn("aspect-square size-full", className)} // 正方形にフィットするスタイル
      {...props} // その他のpropsを展開
    />
  )
}

// AvatarFallbackコンポーネント: 画像読み込みに失敗した場合のフォールバック表示
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    // AvatarPrimitive.Fallbackを使用して代替表示のスタイルを設定
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback" // 識別用のdata-slot属性
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full", // 中央揃えで背景色指定
        className // 追加のカスタムクラスをマージ
      )}
      {...props} // その他のpropsを展開
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
