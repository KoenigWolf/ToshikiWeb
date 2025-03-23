"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, MailOpen, AlignJustify, XCircle } from "lucide-react";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ==============================
// 型定義
// ==============================
type NavItem = { name: string; href: string };
type SocialLinkProps = {
  icon: React.ElementType;
  href: string;
  label: string;
  isExternal?: boolean;
};

// ==============================
// 定数
// ==============================
const SCROLL_THRESHOLD = 10;

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Career", href: "#experience" },
  { name: "Skill", href: "#skills" },
  { name: "Shikaku", href: "#certifications" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "PR", href: "#about" },
];

// メールアドレスは分割してBotに読み取られにくく
const emailUser = "creatorsoasis";
const emailDomain = "outlook.com";

const SOCIAL_LINKS: SocialLinkProps[] = [
  { icon: Github, href: "https://github.com/KoenigWolf", label: "GitHub", isExternal: true },
  { icon: Linkedin, href: "https://www.linkedin.com/in/toshikisakuta/", label: "LinkedIn", isExternal: true },
  { icon: MailOpen, href: `mailto:${emailUser}@${emailDomain}`, label: "メールで連絡" },
];

// ==============================
// アニメーション
// ==============================
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

// ==============================
// Header コンポーネント
// ==============================
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between max-w-screen-xl px-4 py-4 mx-auto">
        {/* ロゴ */}
        <Link href="#home" aria-label="ホーム">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-2xl font-semibold font-noto-sans-jp"
          >
            Toshiki Sakuta
          </motion.div>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="items-center hidden space-x-6 md:flex">
          <ul className="flex space-x-6">
            {NAV_ITEMS.map((item, i) => (
              <NavItemLink key={item.name} {...item} delay={i * 0.1} />
            ))}
          </ul>
          <div className="flex space-x-2">
            {SOCIAL_LINKS.map((link, i) => (
              <SocialLink key={link.href} {...link} delay={i * 0.1} />
            ))}
          </div>
        </nav>

        {/* モバイルメニューアイコン */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニューを開閉"
          >
            {isOpen ? <XCircle className="w-6 h-6" /> : <AlignJustify className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isOpen && <MobileMenu closeMenu={() => setIsOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

// ==============================
// ナビゲーション項目
// ==============================
const NavItemLink = ({ name, href, delay }: NavItem & { delay: number }) => (
  <motion.li variants={fadeInUp} initial="hidden" animate="visible" custom={delay}>
    <Link
      href={href}
      className="transition-colors text-muted-foreground hover:text-primary font-noto-sans-jp"
      aria-label={name}
    >
      {name}
    </Link>
  </motion.li>
);

// ==============================
// ソーシャルリンクボタン
// ==============================
const SocialLink = ({
  icon: Icon,
  href,
  label,
  isExternal,
  delay,
}: SocialLinkProps & { delay: number }) => {
  const isMailLink = href.startsWith("mailto:");
  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={delay}>
      <Button size="icon" variant="ghost" asChild aria-label={label}>
        <a
          href={href}
          target={isExternal || isMailLink ? "_blank" : undefined}
          rel={isExternal || isMailLink ? "noopener noreferrer nofollow" : undefined}
        >
          <Icon className="w-5 h-5" />
        </a>
      </Button>
    </motion.div>
  );
};

// ==============================
// モバイルメニュー
// ==============================
const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <motion.div
    variants={mobileMenuVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="shadow-md bg-background md:hidden"
  >
    <div className="max-w-screen-xl px-4 py-4 mx-auto">
      <ul className="space-y-4">
        {NAV_ITEMS.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              className="block py-2 transition-colors text-muted-foreground hover:text-primary font-noto-sans-jp"
              onClick={closeMenu}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);
