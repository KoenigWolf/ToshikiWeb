"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

// =====================================
// 型定義
// =====================================
type NavItem = {
  name: string;
  href: string;
};

type PageLink = {
  name: string;
  href: string;
  description: string;
};

type SocialLink = {
  icon: React.ElementType;
  href: string;
  label: string;
  isExternal?: boolean;
};

// =====================================
// 定数
// =====================================
/**
 * スクロール検知のしきい値（px）
 * この値を超えるとヘッダーの背景が変化
 */
const SCROLL_THRESHOLD = 10;

/**
 * アニメーション設定
 */
const ANIMATION_DURATION = 0.5; // アニメーション持続時間（秒）
const STAGGER_DELAY = 0.1; // 連続アニメーションの遅延（秒）

/**
 * ナビゲーション項目
 * 新しい項目を追加する場合はこの配列に追加
 */
const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Career", href: "#experience" },
  { name: "Skill", href: "#skills" },
  { name: "Shikaku", href: "#certifications" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "PR", href: "#about" },
];

/**
 * ページリンク項目
 * 固定ページへのリンクを追加する場合はこの配列に追加
 */
const PAGE_LINKS: PageLink[] = [
  { name: "全作品", href: "/portfolio", description: "すべてのポートフォリオ作品を見る" },
];

/**
 * ソーシャルリンク項目
 * ソーシャルメディアやコンタクトへのリンクを追加する場合はこの配列に追加
 */
const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Github,
    href: "https://github.com/KoenigWolf",
    label: "GitHub",
    isExternal: true,
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/toshikisakuta/",
    label: "LinkedIn",
    isExternal: true,
  },
  {
    icon: Mail,
    href: "mailto:toshikiii7@outlook.com",
    label: "メールで連絡",
  },
];

// =====================================
// アニメーション設定
// =====================================
/**
 * ロゴのアニメーション設定
 */
const logoAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_DURATION },
};

/**
 * ナビゲーション項目のアニメーション設定
 * @param index アニメーションを適用する項目のインデックス
 */
const navItemAnimation = (index: number) => ({
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION_DURATION, delay: index * STAGGER_DELAY },
});

/**
 * ソーシャルアイコンのアニメーション設定
 * @param index アニメーションを適用する項目のインデックス
 */
const socialIconAnimation = (index: number) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: ANIMATION_DURATION, 
    delay: (NAV_ITEMS.length + PAGE_LINKS.length) * STAGGER_DELAY + index * STAGGER_DELAY 
  },
});

/**
 * モバイルメニューのアニメーション設定
 */
const mobileMenuAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3 },
};

// =====================================
// ヘッダーコンポーネント
// =====================================
export function Header() {
  // ステート
  const [isOpen, setIsOpen] = useState(false); // モバイルメニューの開閉状態
  const [scrolled, setScrolled] = useState(false); // スクロール状態

  /**
   * スクロールイベントハンドラ
   * 再レンダリングされないようにuseCallbackでメモ化
   */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  /**
   * スクロールイベントリスナーの設定と解除
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    // クリーンアップ関数
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /**
   * モバイルメニューを閉じる
   */
  const closeMenu = () => setIsOpen(false);

  /**
   * スクロール状態に応じたヘッダースタイル
   */
  const headerClassName = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
      : "bg-transparent"
  }`;

  return (
    <header className={headerClassName}>
      {/* ヘッダーコンテンツ */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* ロゴ/サイト名 */}
        <Link href="#home" className="text-xl font-bold">
          <motion.div
            initial={logoAnimation.initial}
            animate={logoAnimation.animate}
            transition={logoAnimation.transition}
            className="font-noto-sans-jp"
          >
            Toshiki Sakuta
          </motion.div>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {/* ナビゲーション項目 */}
            {NAV_ITEMS.map((item, index) => (
              <motion.li
                key={item.name}
                initial={navItemAnimation(index).initial}
                animate={navItemAnimation(index).animate}
                transition={navItemAnimation(index).transition}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-noto-sans-jp"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
            
            {/* ページリンク項目 */}
            {PAGE_LINKS.map((item, index) => (
              <motion.li
                key={item.name}
                initial={navItemAnimation(NAV_ITEMS.length + index).initial}
                animate={navItemAnimation(NAV_ITEMS.length + index).animate}
                transition={navItemAnimation(NAV_ITEMS.length + index).transition}
              >
                <Link
                  href={item.href}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-noto-sans-jp"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          {/* ソーシャルリンク */}
          <div className="flex space-x-2">
            {SOCIAL_LINKS.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.div
                  key={link.href}
                  initial={socialIconAnimation(index).initial}
                  animate={socialIconAnimation(index).animate}
                  transition={socialIconAnimation(index).transition}
                >
                  <Button size="icon" variant="ghost" asChild>
                    <a 
                      href={link.href} 
                      target={link.isExternal ? "_blank" : undefined} 
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* モバイルメニューボタン */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* モバイルナビゲーション - アニメーション付き */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={mobileMenuAnimation.initial}
            animate={mobileMenuAnimation.animate}
            exit={mobileMenuAnimation.exit}
            transition={mobileMenuAnimation.transition}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {/* ナビゲーション項目 - モバイル */}
                {NAV_ITEMS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-noto-sans-jp"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* ページリンク項目 - モバイル */}
                {PAGE_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-noto-sans-jp"
                      onClick={closeMenu}
                    >
                      {item.name}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* ソーシャルリンク - モバイル */}
              <div className="flex space-x-2 mt-4">
                {SOCIAL_LINKS.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Button key={link.href} size="icon" variant="ghost" asChild>
                      <a 
                        href={link.href} 
                        target={link.isExternal ? "_blank" : undefined} 
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                        aria-label={link.label}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 