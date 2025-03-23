"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ピカソスタイルの抽象的なSplash効果を提供するコンポーネント
export function SplashCursorWrapper() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [shapes, setShapes] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; rotation: number }>>([]);
  const nextId = useRef(0);
  
  // 抽象的な形状の色
  const colors = [
    "var(--primary)",
    "var(--secondary)",
    "var(--accent)",
    "var(--chart-1)",
    "var(--chart-2)",
  ];

  useEffect(() => {
    // マウス移動時のイベントハンドラー
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.8) { // 20%の確率で形状を追加
        const size = Math.random() * 60 + 20; // 20-80pxのサイズ
        const newShape = {
          id: nextId.current++,
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size,
          rotation: Math.random() * 360,
        };
        
        setShapes(prev => [...prev.slice(-15), newShape]); // 最大15個の形状を保持
      }
      
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    // タッチイベントのハンドラー
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0] && Math.random() > 0.8) {
        const touch = e.touches[0];
        const size = Math.random() * 60 + 20;
        const newShape = {
          id: nextId.current++,
          x: touch.clientX,
          y: touch.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size,
          rotation: Math.random() * 360,
        };
        
        setShapes(prev => [...prev.slice(-15), newShape]);
      }
      
      if (e.touches[0]) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setIsVisible(true);
      }
    };
    
    // 画面から指が離れたときのハンドラー
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    // イベントリスナーの登録
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // クリーンアップ関数
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // colorsは実際には変更されないので依存配列から削除
  
  // 抽象的なピカソスタイルの背景パターン
  const abstractPatterns = [
    <svg key="pattern1" className="fixed top-0 left-0 w-full h-full opacity-5 pointer-events-none z-[-1]" aria-hidden="true">
      <title>ピカソスタイルの背景パターン</title>
      <defs>
        <pattern id="picassoPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
          <polygon points="20,20 80,30 70,80 10,70" fill="none" stroke="var(--secondary)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#picassoPattern)" />
    </svg>
  ];

  return (
    <>
      {/* ピカソスタイルの背景パターン */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        {abstractPatterns}
        <div className="fixed top-0 left-0 right-0 h-64 bg-picasso-gradient opacity-10" />
      </div>
      
      {/* カーソルに追従する抽象的な形状 */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="fixed pointer-events-none z-[-1]"
          initial={{ 
            x: shape.x - shape.size / 2, 
            y: shape.y - shape.size / 2, 
            opacity: 0.7,
            scale: 0.2,
            rotate: shape.rotation 
          }}
          animate={{
            opacity: 0,
            scale: 1,
            rotate: shape.rotation + 180
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: shape.color,
              opacity: 0.4,
              clipPath: Math.random() > 0.5 
                ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                : 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
            }}
          />
        </motion.div>
      ))}
      
      {/* メインカーソルエフェクト */}
      {isVisible && (
        <motion.div
          className="fixed z-10 pointer-events-none"
          style={{
            left: position.x - 20,
            top: position.y - 20,
            width: '40px',
            height: '40px',
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full border rounded-full bg-primary/20 backdrop-blur-sm border-primary/30" />
        </motion.div>
      )}
    </>
  );
}
