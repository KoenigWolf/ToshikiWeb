import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// buttonVariants: ボタンのスタイルバリエーションを定義
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default", // デフォルトのボタンスタイル
      size: "default",    // デフォルトのサイズ
    },
  }
)

// ButtonProps: ボタンコンポーネントのプロパティ型定義
export interface ButtonProps extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean; // trueならSlotコンポーネントとしてレンダリング
}

// Buttonコンポーネント: 汎用的なボタンUIを提供する
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  // asChildがtrueの場合はSlotを使用、そうでなければbuttonタグを使用
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button" // 識別用のdata-slot属性
      className={cn(buttonVariants({ variant, size, className }))} // ボタンのバリアントとサイズを適用
      {...props} // その他のpropsを展開
    />
  )
}

export { Button, buttonVariants }
