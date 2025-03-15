"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

// fadeInUp: フェードイン・スライドアップのアニメーション設定を返す関数
const fadeInUp = (delay: number = 0) => ({
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

// ProfileIconコンポーネント: プロフィール画像とステータスインジケーターを表示
const ProfileIcon = () => (
  <motion.div {...fadeInUp()} className="relative inline-block mb-4">
    <div className="flex items-center justify-center w-32 h-32 overflow-hidden rounded-full md:w-40 md:h-40 bg-gradient-to-r from-blue-500 to-purple-600">
      <Image
        src="/Toshiki.webp" // プロフィール画像のパス
        alt="Toshiki Sakuta" // 画像の代替テキスト
        className="object-cover w-full h-full"
        width={160} // 画像の幅
        height={160} // 画像の高さ
      />
    </div>
    <motion.div
      initial={{ scale: 0 }} // 初期状態: ゼロスケール
      animate={{ scale: 1 }}   // アニメート状態: 通常サイズ
      transition={{ delay: 0.5, duration: 0.3, type: "spring" }} // スプリングアニメーションで遷移
      className="absolute p-2 bg-white rounded-full shadow-lg -bottom-2 -right-2 dark:bg-gray-800"
    >
      <div className="w-4 h-4 bg-green-500 rounded-full" /> {/* ステータスインジケーター */}
    </motion.div>
  </motion.div>
);

// ScrollDownButtonコンポーネント: 下部へスクロールするボタンを表示
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
      <button
        onClick={scrollToBottom} // クリックでスクロール実行
        className="inline-flex items-center justify-center w-12 h-12 transition-shadow bg-white rounded-full shadow-lg dark:bg-gray-800 hover:shadow-xl"
        aria-label="ページ最下部にスクロール" // アクセシビリティ用ラベル
      >
        <ArrowDown className="w-6 h-6 text-gray-700 dark:text-gray-300" /> {/* 矢印アイコン */}
      </button>
    </motion.div>
  );
};
