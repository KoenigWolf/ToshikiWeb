import * as React from "react"
import { cn } from "@/lib/utils"

// Cardコンポーネント: カード全体のコンテナを提供する
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card" // 識別用のdata-slot属性
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", // カードの基本スタイル
        className // 追加のカスタムクラスをマージ
      )}
      {...props} // その他のpropsを展開
    />
  )
}

// CardHeaderコンポーネント: カードのヘッダー部分を提供する
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header" // 識別用のdata-slot属性
      className={cn("flex flex-col gap-1.5 px-6", className)} // ヘッダーの基本スタイル
      {...props} // その他のpropsを展開
    />
  )
}

// CardTitleコンポーネント: カードのタイトルを表示する
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title" // 識別用のdata-slot属性
      className={cn("leading-none font-semibold", className)} // タイトルのスタイル
      {...props} // その他のpropsを展開
    />
  )
}

// CardDescriptionコンポーネント: カードの説明文を表示する
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description" // 識別用のdata-slot属性
      className={cn("text-muted-foreground text-sm", className)} // 説明文のスタイル
      {...props} // その他のpropsを展開
    />
  )
}

// CardContentコンポーネント: カードのメインコンテンツ部分を表示する
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content" // 識別用のdata-slot属性
      className={cn("px-6", className)} // コンテンツ領域のスタイル
      {...props} // その他のpropsを展開
    />
  )
}

// CardFooterコンポーネント: カードのフッター部分を表示する
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer" // 識別用のdata-slot属性
      className={cn("flex items-center px-6", className)} // フッターの基本スタイル
      {...props} // その他のpropsを展開
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
