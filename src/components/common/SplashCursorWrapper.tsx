"use client";


// クライアントコンポーネント：SplashCursor のラッパー

import { SplashCursor } from "@/components/ui/splash-cursor";


// SplashCursor の設定を統一し、再利用しやすくする

export function SplashCursorWrapper() {
  return (
    <SplashCursor 
      SPLAT_RADIUS={0.25}           // スプラッシュの半径
      COLOR_UPDATE_SPEED={15}       // カラー更新速度
      BACK_COLOR={{ r: 0, g: 0, b: 0 }} // 背景色（黒）
    />
  );
}
