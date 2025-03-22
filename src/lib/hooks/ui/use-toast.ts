"use client"

import { useState, useEffect, useCallback } from "react"

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_TIMEOUT = 5000 // 5秒

export type ToastData = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  isOpen?: boolean
}

export type Toast = Omit<ToastData, "isOpen">

let count = 0 // ユニークIDを生成するためのカウンター

/**
 * トースト通知を管理するためのカスタムフック
 * 
 * 通知の表示、非表示、複数通知の管理を行います。
 * クライアントコンポーネント内で使用します。
 * 
 * @returns トースト管理関数と現在のトースト一覧
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  /**
   * トースト通知を追加する関数
   * @param props トースト通知のプロパティ
   */
  const toast = useCallback(({ ...props }: Toast) => {
    const id = props.id || String(count++)
    const newToast = { ...props, id, isOpen: true }
    
    setToasts((toasts) => {
      // 同じIDのトーストが既に存在する場合は更新、なければ追加
      const existingToastIndex = toasts.findIndex((t) => t.id === id)
      
      if (existingToastIndex >= 0) {
        const updatedToasts = [...toasts]
        updatedToasts[existingToastIndex] = newToast
        return updatedToasts
      }
      
      return [...toasts, newToast]
    })
    
    return id
  }, [])

  /**
   * 特定のトースト通知を削除する関数
   * @param id 削除するトーストのID
   */
  const dismiss = useCallback((id: string) => {
    setToasts((toasts) => 
      toasts.map((toast) => 
        toast.id === id 
          ? { ...toast, isOpen: false } 
          : toast
      )
    )
  }, [])

  /**
   * 全てのトースト通知を削除する関数
   */
  const dismissAll = useCallback(() => {
    setToasts((toasts) => 
      toasts.map((toast) => ({ ...toast, isOpen: false }))
    )
  }, [])

  /**
   * アクティブなトーストの自動削除と、表示が終了したトーストの削除を管理
   */
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = []
    
    // トーストごとのタイマー設定
    toasts.forEach((toast) => {
      if (toast.isOpen) {
        const timeoutId = setTimeout(() => {
          dismiss(toast.id)
        }, TOAST_TIMEOUT)
        
        timeoutIds.push(timeoutId)
      }
    })
    
    // 非表示のトーストを配列から削除
    const activeToasts = toasts.filter((toast) => toast.isOpen)
    if (activeToasts.length < toasts.length) {
      setTimeout(() => {
        setToasts(activeToasts)
      }, 300) // 非表示アニメーション完了後に削除
    }
    
    // クリーンアップ: コンポーネントのアンマウント時にタイマーをクリア
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [toasts, dismiss])

  return {
    toast,
    dismiss,
    dismissAll,
    toasts,
  }
} 