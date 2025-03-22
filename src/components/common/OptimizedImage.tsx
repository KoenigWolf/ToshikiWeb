"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  showSkeleton?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onLoadingComplete?: () => void;
}

/**
 * 最適化された画像コンポーネント
 * Next.jsのImage最適化機能とスケルトンローディングを実装
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 85,
  priority = false,
  fill = false,
  className = "",
  containerClassName = "",
  showSkeleton = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  loading = "lazy",
  objectFit = "cover",
  onLoad,
  onLoadingComplete
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // SrcがURLかどうかをチェック
  const isRemoteImage = src?.startsWith('http') || src?.startsWith('//');

  // 画像読み込み完了時の処理
  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoad?.();
    onLoadingComplete?.();
  };

  // 画像読み込みエラー時の処理
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // 優先度が高い場合は eager ローディングを使用
  const imageLoading = priority ? "eager" : loading;

  // objectFitをスタイルに変換
  const objectFitStyle = objectFit ? { objectFit } : {};

  useEffect(() => {
    // SRCが変更されたら状態をリセット
    setIsLoading(true);
    setError(false);
  }, [src]);

  // コンテナクラス名
  const containerClasses = cn(
    "relative overflow-hidden",
    fill ? "w-full h-full" : "",
    containerClassName
  );

  // 画像クラス名
  const imageClasses = cn(
    "transition-opacity duration-300",
    isLoading ? "opacity-0" : "opacity-100",
    error ? "grayscale opacity-50" : "",
    className
  );

  // エラー時の代替表示
  if (error) {
    return (
      <div className={containerClasses}>
        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {alt || 'Image not available'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {showSkeleton && isLoading && (
        <Skeleton 
          className="absolute inset-0 z-10 w-full h-full bg-gray-200 dark:bg-gray-800"
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        quality={quality}
        priority={priority}
        fill={fill}
        className={imageClasses}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        loading={imageLoading}
        sizes={sizes}
        style={objectFitStyle}
        unoptimized={isRemoteImage && !src.includes(process.env.NEXT_PUBLIC_SITE_URL || '')}
      />
    </div>
  );
} 