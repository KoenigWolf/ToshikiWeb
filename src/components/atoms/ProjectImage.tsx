// --------------------------
// ProjectImage コンポーネント
// --------------------------
import Image from "next/image";

// ProjectImageProps: プロジェクト画像コンポーネントのプロパティ定義
export interface ProjectImageProps {
  src: string;              // 画像のソースURL
  alt: string;              // 画像の代替テキスト
  height?: string | number; // 画像の高さ（ピクセル値またはTailwindのクラス）
  priority?: boolean;       // 画像の読み込み優先度
  className?: string;       // 追加のスタイルクラス
}

// ProjectImage コンポーネント: プロジェクトやPortfolioのサムネイル画像を表示
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
      // heightがnumberの場合はpx単位を追加、文字列ならそのまま使用
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <Image
        src={src}
        alt={alt}
        fill               // コンテナに合わせて画像サイズを調整
        className="object-cover" // 画像の表示方法をカバーに設定
        priority={priority}      // 優先的に読み込むかどうか
      />
    </div>
  );
}
