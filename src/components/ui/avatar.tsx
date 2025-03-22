"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// avatarVariants: アバターのサイズバリエーションを定義
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-10 w-10",
        md: "h-16 w-16",
        lg: "h-24 w-24",
        xl: "h-32 w-32 md:h-40 md:w-40",
      },
    },
    defaultVariants: {
      size: "md", // デフォルトのサイズは"md"
    },
  }
)

// Avatarコンポーネント: プロフィール画像を円形に表示
const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarVariants>
>(({ className, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
))
Avatar.displayName = "Avatar"

// AvatarImageコンポーネント: アバター内の画像を表示
// alt属性はpropsから渡される必要があり、コンポーネントの使用者が
// 適切なアクセシビリティテキストを提供する責任があります
const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

// AvatarFallbackコンポーネント: 画像がない場合のフォールバック表示
const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
