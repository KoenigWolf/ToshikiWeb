"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * TooltipProviderコンポーネント
 * 
 * Tooltipを使用するコンポーネントの祖先に配置するプロバイダー。
 * アプリのルートレベルまたはTooltipを使用する領域の親コンポーネントに配置する。
 * 
 * @param props - TooltipPrimitive.Providerのprops
 */
const TooltipProvider = TooltipPrimitive.Provider

/**
 * Tooltipコンポーネント
 * 
 * ホバーによって情報を表示するための基本的なTooltipコンテナ。
 * このコンポーネント自体は直接使用せず、子コンポーネントを通じて使用します。
 * 
 * @param props - TooltipPrimitive.Rootのprops
 */
const Tooltip = TooltipPrimitive.Root

/**
 * TooltipTriggerコンポーネント
 * 
 * Tooltipを表示するトリガー要素。
 * ユーザーがこの要素とインタラクションすると、Tooltipが表示されます。
 * 
 * @param props - TooltipPrimitive.Triggerのprops
 */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * TooltipContentコンポーネント
 * 
 * Tooltipの内容を表示するコンポーネント。
 * サイズ、背景色、アニメーションなどのスタイルを適用します。
 * 
 * @param props.className - 追加のCSSクラス
 * @param props.sideOffset - トリガーからの距離（ピクセル単位）
 * @param props.children - Tooltipの内容
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } 