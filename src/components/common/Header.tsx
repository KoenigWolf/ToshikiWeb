"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

// 型定義
type NavItem = { name: string; href: string };
type SocialLinkProps = { icon: React.ElementType; href: string; label: string; isExternal?: boolean };

// 定数
const SCROLL_THRESHOLD = 10;

// ナビゲーション項目
const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Career", href: "#experience" },
  { name: "Skill", href: "#skills" },
  { name: "Shikaku", href: "#certifications" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "PR", href: "#about" },
];

// ソーシャルリンク
const SOCIAL_LINKS: SocialLinkProps[] = [
  { icon: Github, href: "https://github.com/KoenigWolf", label: "GitHub", isExternal: true },
  { icon: Linkedin, href: "https://www.linkedin.com/in/toshikisakuta/", label: "LinkedIn", isExternal: true },
  { icon: Mail, href: "mailto:creatorsoasis@outlook.com", label: "メールで連絡" },
];

// アニメーション設定 (variants)

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};


// ヘッダーコンポーネント

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロールを監視
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  // スクロールイベントを設定 & クリーンアップ
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* ロゴ */}
        <Link href="#home" className="text-xl font-bold" aria-label="ホーム">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="font-noto-sans-jp">
            Toshiki Sakuta
          </motion.div>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="items-center hidden space-x-6 md:flex">
          <ul className="flex space-x-6">
            {NAV_ITEMS.map((item, index) => (
              <NavItemLink key={item.name} {...item} delay={index * 0.1} />
            ))}
          </ul>

          {/* ソーシャルリンク */}
          <div className="flex space-x-2">
            {SOCIAL_LINKS.map(({ icon, href, label, isExternal }, index) => (
              <SocialLink key={href} icon={icon} href={href} label={label} isExternal={isExternal} delay={index * 0.1} />
            ))}
          </div>
        </nav>

        {/* モバイルメニューアイコン（モバイルでのみ表示） */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="メニューを開閉">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* モバイルメニュー（モバイルでのみ表示） */}
      <AnimatePresence>
        {isOpen && <MobileMenu closeMenu={() => setIsOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}


// ナビゲーション項目コンポーネント

const NavItemLink = ({ name, href, delay }: NavItem & { delay: number }) => (
  <motion.li variants={fadeInUp} initial="hidden" animate="visible" custom={delay}>
    <Link href={href} className="text-gray-700 transition-colors dark:text-gray-300 hover:text-primary font-noto-sans-jp" aria-label={name}>
      {name}
    </Link>
  </motion.li>
);


// ソーシャルリンクコンポーネント

const SocialLink = ({ icon: Icon, href, label, isExternal, delay }: SocialLinkProps & { delay: number }) => (
  <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={delay}>
    <Button size="icon" variant="ghost" asChild aria-label={label}>
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        <Icon className="w-5 h-5" />
      </a>
    </Button>
  </motion.div>
);


// モバイルメニューコンポーネント

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit" className="bg-white shadow-lg md:hidden dark:bg-gray-900">
    <div className="container px-4 py-4 mx-auto">
      <ul className="space-y-4">
        {NAV_ITEMS.map(({ name, href }) => (
          <li key={name}>
            <Link href={href} className="block py-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-primary font-noto-sans-jp" onClick={closeMenu}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);
