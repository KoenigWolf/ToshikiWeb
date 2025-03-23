"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data/profile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

// 抽象的なシェイプコンポーネント（ピカソスタイル）
const AbstractShape = ({ className = "", style = {}, ...props }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    style={style}
    {...props}
  />
);

// fadeInUp: フェードイン・スライドアップのアニメーション設定を返す関数
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 }, // 初期状態: 透明で下に20pxずれている
  animate: { opacity: 1, y: 0 },  // 表示状態: 完全に表示で元の位置
  transition: { duration: 0.5, delay }, // 遷移時間0.5秒、指定したdelayを待つ
});

// HeroSectionコンポーネント: ヒーローセクション全体を表示
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-20 pb-10 overflow-hidden"
    >
      {/* ピカソスタイルの抽象的な背景 */}
      <div className="absolute inset-0 opacity-10">
        <AbstractShape
          className="w-40 h-40 rounded-full bg-primary"
          style={{ top: '15%', left: '10%' }}
          animate={{
            x: [0, 10, -5, 0],
            y: [0, -10, 5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <AbstractShape
          className="w-64 h-64"
          style={{ 
            top: '60%', 
            right: '15%',
            background: 'var(--secondary)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
          animate={{
            x: [0, -15, 10, 0],
            y: [0, 15, -10, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <AbstractShape
          className="w-48 h-48"
          style={{ 
            top: '25%', 
            right: '25%',
            background: 'var(--accent)',
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -20, 10, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <ProfileIcon /> {/* プロフィールアイコン */}
        <motion.h1 
          {...fadeInUp(0.2)} 
          className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl font-noto-sans-jp"
        >
          {personalInfo.name} {/* 名前 */}
        </motion.h1>
        <motion.p
          {...fadeInUp(0.4)}
          className="max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300 font-noto-sans-jp"
        >
          {personalInfo.summary} {/* 自己紹介文 */}
        </motion.p>
        <ScrollDownButton /> {/* スクロールダウンボタン */}
      </div>
    </section>
  );
}

// ProfileIconコンポーネント：プロフィール画像とステータスインジケーターを表示
const ProfileIcon = () => (
  <motion.div {...fadeInUp()} className="relative inline-block mb-4">
    <div className="cubism-animation">
      <Avatar size="xl" className="border-4 border-primary/20 picasso-border">
        <AvatarImage src="/Toshiki.webp" alt="Toshiki Sakuta" />
        <AvatarFallback>TS</AvatarFallback>
      </Avatar>
    </div>
    <motion.div
      initial={{ scale: 0 }} // 初期状態: ゼロスケール
      animate={{ scale: 1 }}   // アニメート状態: 通常サイズ
      transition={{ delay: 0.5, duration: 0.3, type: "spring" }} // スプリングアニメーションで遷移
      className="absolute p-1 bg-white rounded-full shadow-lg -bottom-2 -right-2 dark:bg-gray-800"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="success" className="w-4 h-4 p-0 rounded-full cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Available for opportunities</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  </motion.div>
);

// ScrollDownButtonコンポーネント：下部へスクロールするボタンを表示
const ScrollDownButton = () => {
  // ページ最下部へスムーズにスクロールする関数
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // ページ全体の高さまで
      behavior: "smooth", // スムーズなスクロール
    });
  };

  return (
    <motion.div {...fadeInUp(0.7)} className="mt-16">
      <Button 
        onClick={scrollToBottom}
        size="icon"
        variant="outline"
        className="w-12 h-12 rounded-full picasso-border"
        aria-label="ページ最下部にスクロール"
      >
        <ArrowDown className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};
