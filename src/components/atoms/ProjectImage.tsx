import Image from "next/image";

// =====================================
// プロジェクト画像コンポーネント
// プロジェクトやPortfolioのサムネイル画像表示
// Atomic Design: Atom - 単一の機能を持つ最小単位のUIコンポーネント
// =====================================

export interface ProjectImageProps {
  /** 画像のソースURL */
  src: string;
  
  /** 画像の代替テキスト */
  alt: string;
  
  /** 画像の高さ（ピクセルまたはTailwindのクラス） */
  height?: string | number;
  
  /** 画像の表示優先度 */
  priority?: boolean;
  
  /** 追加のスタイルクラス */
  className?: string;
}

/**
 * プロジェクト画像 - プロジェクトのサムネイル画像を表示
 * @param props コンポーネントのプロパティ
 * @returns ProjectImageコンポーネント
 */
export function ProjectImage({ 
  src,
  alt,
  height = "400px",
  priority = true,
  className = "mb-8"
}: ProjectImageProps) {
  return (
    <div 
      className={`relative w-full rounded-lg overflow-hidden ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
      />
    </div>
  );
} 