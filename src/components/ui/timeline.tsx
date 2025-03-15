"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// =====================================
// Types
// =====================================

export interface TimelineEntry {
  /** タイムラインエントリーのタイトル (年度など) */
  title: string;
  /** タイムラインエントリーの内容 (React Node) */
  content: ReactNode;
}

interface TimelineProps {
  /** タイムラインに表示するデータの配列 */
  data: TimelineEntry[];
}

interface TimelineItemProps extends TimelineEntry {
  /** モバイル表示かどうか */
  isMobile?: boolean;
}

// =====================================
// Custom Hook - useTimelineScroll
// スクロールアニメーションのロジックを管理
// =====================================

const useTimelineScroll = (containerRef: React.RefObject<HTMLDivElement | null>, height: number) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return { heightTransform, opacityTransform };
};

// =====================================
// TimelineHeader Component
// タイムラインのヘッダー部分を表示
// =====================================

const TimelineHeader = () => (
  <div className="px-4 py-8 mx-auto max-w-7xl md:px-8 lg:px-10">
    <h2 className="max-w-4xl mb-4 text-lg text-gray-900 md:text-3xl dark:text-gray-100 font-noto-sans-jp">
      経歴タイムライン
    </h2>
    <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400 md:text-base font-noto-sans-jp">
      私のキャリアの軌跡をタイムラインで表示しています。
    </p>
  </div>
);

// =====================================
// TimelineItem Component
// 個々のタイムラインアイテムを表示
// =====================================

const TimelineItem = ({ title, content }: TimelineItemProps) => {
  const markerClasses = cn(
    "absolute flex items-center justify-center w-10 h-10",
    "bg-white dark:bg-black rounded-full left-3 md:left-3"
  );

  const dotClasses = cn(
    "w-4 h-4 p-2 border rounded-full",
    "bg-neutral-200 dark:bg-neutral-800",
    "border-neutral-300 dark:border-neutral-700"
  );

  const titleClasses = cn(
    "text-neutral-500 dark:text-neutral-500",
    "hidden md:block md:pl-20 md:text-5xl",
    "font-bold"
  );

  const mobileTitleClasses = cn(
    "block md:hidden mb-4 text-2xl font-bold text-left",
    "text-neutral-500 dark:text-neutral-500"
  );

  return (
    <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        <div className={markerClasses}>
          <div className={dotClasses} />
        </div>
        <h3 className={titleClasses}>{title}</h3>
      </div>

      <div className="relative w-full pl-20 pr-4 md:pl-4">
        <h3 className={mobileTitleClasses}>{title}</h3>
        {content}
      </div>
    </div>
  );
};

// =====================================
// Timeline Progress Line Component
// スクロールに応じて進捗を表示する線
// =====================================

interface TimelineProgressLineProps {
  height: number;
  heightTransform: MotionValue<number>;
  opacityTransform: MotionValue<number>;
}

const TimelineProgressLine = ({
  height,
  heightTransform,
  opacityTransform,
}: TimelineProgressLineProps) => {
  const lineWrapperClasses = cn(
    "absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]",
    "bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]",
    "from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]",
    "[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
  );

  const lineClasses = cn(
    "absolute inset-x-0 top-0 w-[2px]",
    "bg-gradient-to-t from-purple-500 via-blue-500 to-transparent",
    "from-[0%] via-[10%] rounded-full"
  );

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
  );
};

// =====================================
// Main Timeline Component
// タイムラインの全体的な構造を管理
// =====================================

export const Timeline = ({ data }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // タイムラインの高さを計算
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    // ウィンドウリサイズ時にも高さを更新
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []); // 依存配列を空に

  // スクロールアニメーションの設定
  const { heightTransform, opacityTransform } = useTimelineScroll(containerRef, height);

  return (
    <div
      className="w-full font-sans bg-white dark:bg-neutral-950 md:px-10"
      ref={containerRef}
    >
      <TimelineHeader />

      <div ref={ref} className="relative pb-20 mx-auto max-w-7xl">
        {data.map((item) => (
          <TimelineItem key={item.title} {...item} />
        ))}
        
        <TimelineProgressLine
          height={height}
          heightTransform={heightTransform}
          opacityTransform={opacityTransform}
        />
      </div>
    </div>
  );
};
