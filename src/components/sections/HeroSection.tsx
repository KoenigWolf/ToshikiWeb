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
      className="flex items-center justify-center min-h-screen pt-20 pb-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container px-4 mx-auto text-center">
        <ProfileIcon /> {/* プロフィールアイコン */}
        <motion.h1 {...fadeInUp(0.2)} className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl font-noto-sans-jp">
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
    <Avatar size="xl" className="border-4 border-primary/20">
      <AvatarImage src="/Toshiki.webp" alt="Toshiki Sakuta" />
      <AvatarFallback>TS</AvatarFallback>
    </Avatar>
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
        className="w-12 h-12 rounded-full"
        aria-label="ページ最下部にスクロール"
      >
        <ArrowDown className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};
