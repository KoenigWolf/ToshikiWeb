"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

// =====================================
// フェードイン・スライドアップのアニメーション設定
// =====================================
const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

// =====================================
// HeroSection コンポーネント
// =====================================
export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 
                 bg-gradient-to-b from-blue-50 to-white 
                 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 text-center">
        {/* プロフィールアイコン */}
        <ProfileIcon />

        {/* 名前 */}
        <motion.h1 {...fadeInUp(0.2)} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-noto-sans-jp">
          {personalInfo.name}
        </motion.h1>

        {/* 自己紹介文 */}
        <motion.p
          {...fadeInUp(0.4)}
          className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 font-noto-sans-jp mb-8"
        >
          {personalInfo.summary}
        </motion.p>

        {/* スクロールダウンボタン */}
        <ScrollDownButton />
      </div>
    </section>
  );
}

// =====================================
// プロフィールアイコンコンポーネント
// =====================================
const ProfileIcon = () => (
  <motion.div {...fadeInUp()} className="mb-4 inline-block relative">
    <div
      className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden 
                 bg-gradient-to-r from-blue-500 to-purple-600 
                 flex items-center justify-center"
    >
      <Image
        src="/Toshiki.webp"
        alt="Toshiki Sakuta"
        className="w-full h-full object-cover"
        width={160}
        height={160}
      />
    </div>

    {/* ステータスインジケーター */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
      className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
    >
      <div className="bg-green-500 w-4 h-4 rounded-full" />
    </motion.div>
  </motion.div>
);

// =====================================
// スクロールダウンボタンコンポーネント
// =====================================
const ScrollDownButton = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.div {...fadeInUp(0.7)} className="mt-16">
      <button
        onClick={scrollToBottom}
        className="inline-flex items-center justify-center w-12 h-12 rounded-full 
                 bg-white dark:bg-gray-800 shadow-lg 
                 hover:shadow-xl transition-shadow"
        aria-label="ページ最下部にスクロール"
      >
        <ArrowDown className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      </button>
    </motion.div>
  );
};
