"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/lib/hooks/ui/use-toast"

/**
 * Toaster コンポーネント
 * 
 * アプリケーション内でトースト通知を表示するためのコンポーネント。
 * useToast フックで管理されるトースト通知を実際の UI として表示します。
 * レイアウトや _app.tsx などのルートコンポーネントに配置して使用します。
 */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
} 