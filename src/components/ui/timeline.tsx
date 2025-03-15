"use client"

import { useScroll, useTransform, motion, type MotionValue } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// ------------------------------------------------------
// 型定義（Types）
// ------------------------------------------------------

export interface TimelineEntry {
  /** タイムラインエントリーのタイトル（例：年度） */
  title: string
  /** タイムラインエントリーの内容（ReactNodeとして柔軟に定義） */
  content: ReactNode
}

interface TimelineProps {
  /** タイムラインに表示するエントリーの配列 */
  data: TimelineEntry[]
}

interface TimelineItemProps extends TimelineEntry {
  /** モバイル表示かどうか（将来の拡張用） */
  isMobile?: boolean
}

// ------------------------------------------------------
// カスタムフック：useTimelineScrollAnimation
// タイムラインのスクロール進捗に連動したアニメーションを管理
// ------------------------------------------------------
const useTimelineScrollAnimation = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  containerHeight: number
) => {
  // Framer MotionのuseScrollで対象要素のスクロール進捗を取得
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // スクロール開始位置と終了位置をパーセンテージで指定
    offset: ["start 10%", "end 50%"],
  })

  // スクロール進捗（0～1）を、タイムライン進捗線の高さ（0～containerHeight）に変換
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, containerHeight])

  // スクロール初期部分でのフェードイン効果：進捗0～0.1を不透明度0～1に変換
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return { heightTransform, opacityTransform }
}

// ------------------------------------------------------
// コンポーネント：TimelineItem
// 各タイムラインエントリーの表示ロジックを担当
// ------------------------------------------------------
const TimelineItem = ({ title, content }: TimelineItemProps) => {
  // タイムラインマーカーの外側（丸）のスタイル
  const markerClasses = cn(
    "absolute flex items-center justify-center w-10 h-10",
    "bg-white dark:bg-black rounded-full left-3 md:left-3"
  )

  // タイムラインマーカー内のドット（小さい円）のスタイル
  const dotClasses = cn(
    "w-4 h-4 p-2 border rounded-full",
    "bg-neutral-200 dark:bg-neutral-800",
    "border-neutral-300 dark:border-neutral-700"
  )

  // デスクトップ表示用のタイトルスタイル
  const desktopTitleClasses = cn(
    "text-neutral-500 dark:text-neutral-500",
    "hidden md:block md:pl-20 md:text-5xl",
    "font-bold"
  )

  // モバイル表示用のタイトルスタイル
  const mobileTitleClasses = cn(
    "block md:hidden mb-4 text-2xl font-bold text-left",
    "text-neutral-500 dark:text-neutral-500"
  )

  return (
    <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
      {/*
        左側の固定エリア：
         ・スクロールしても上部に固定される配置（sticky）
         ・タイムラインマーカーとデスクトップ用タイトルを表示
      */}
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        <div className={markerClasses}>
          <div className={dotClasses} />
        </div>
        <h3 className={desktopTitleClasses}>{title}</h3>
      </div>

      {/*
        右側のコンテンツエリア：
         ・モバイル表示時はタイトルを上部に再表示し、内容と共にレンダリング
      */}
      <div className="relative w-full pl-20 pr-4 md:pl-4">
        <h3 className={mobileTitleClasses}>{title}</h3>
        {content}
      </div>
    </div>
  )
}

// ------------------------------------------------------
// コンポーネント：TimelineProgressLine
// スクロール進捗に合わせて動的に変化する線を表示
// ------------------------------------------------------
interface TimelineProgressLineProps {
  height: number
  heightTransform: MotionValue<number>
  opacityTransform: MotionValue<number>
}

const TimelineProgressLine = ({
  height,
  heightTransform,
  opacityTransform,
}: TimelineProgressLineProps) => {
  // ラッパー要素：
  // ・絶対配置で、タイムラインの左側に固定
  // ・線の背景にグラデーションを設定し、上下のフェードアウト効果を実現
  const lineWrapperClasses = cn(
    "absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]",
    "bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]",
    "from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]",
    "[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
  )

  // 実際の進捗線：
  // ・motion.divで高さと不透明度をアニメーション
  // ・グラデーションの色で動的な視覚効果を提供
  const lineClasses = cn(
    "absolute inset-x-0 top-0 w-[2px]",
    "bg-gradient-to-t from-purple-500 via-blue-500 to-transparent",
    "from-[0%] via-[10%] rounded-full"
  )

  return (
    <div style={{ height: `${height}px` }} className={lineWrapperClasses}>
      <motion.div
        style={{
          height: heightTransform,
          opacity: opacityTransform,
        }}
        className={lineClasses}
      />
    </div>
  )
}

// ------------------------------------------------------
// コンポーネント：Timeline
// タイムライン全体のレイアウトおよび各エントリーのレンダリングを管理
// ------------------------------------------------------
export const Timeline = ({ data }: TimelineProps) => {
  // タイムライン全体の高さ計測に必要な参照
  const timelineRef = useRef<HTMLDivElement>(null)
  // スクロールアニメーション対象となるコンテナ参照
  const containerRef = useRef<HTMLDivElement>(null)
  // タイムライン全体の高さ（進捗線の高さに使用）
  const [containerHeight, setContainerHeight] = useState(0)

  // 初回レンダリング時およびウィンドウリサイズ時にタイムラインの高さを計測
  useEffect(() => {
    // 高さ更新用の関数
    const updateContainerHeight = () => {
      if (timelineRef.current) {
        // 要素の境界矩形から高さを取得し、状態を更新
        const { height } = timelineRef.current.getBoundingClientRect()
        setContainerHeight(height)
      }
    }

    // 初期計測
    updateContainerHeight()

    // リサイズイベントで高さを再計測
    window.addEventListener("resize", updateContainerHeight)
    return () => window.removeEventListener("resize", updateContainerHeight)
  }, [])

  // スクロールアニメーションの設定をカスタムフックから取得
  const { heightTransform, opacityTransform } = useTimelineScrollAnimation(
    containerRef,
    containerHeight
  )

  return (
    <div className="w-full font-sans bg-white dark:bg-neutral-950 md:px-10" ref={containerRef}>
      <div ref={timelineRef} className="relative pb-20 mx-auto max-w-7xl">
        {/*
          タイムラインエントリーを順次レンダリング
        */}
        {data.map((entry) => (
          <TimelineItem key={entry.title} {...entry} />
        ))}
        {/*
          スクロールに連動した進捗線を描画
        */}
        <TimelineProgressLine
          height={containerHeight}
          heightTransform={heightTransform}
          opacityTransform={opacityTransform}
        />
      </div>
    </div>
  )
}
