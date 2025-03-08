"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

// =====================================
// 共通アニメーション設定
// =====================================
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

// =====================================
// フッターコンポーネント
// =====================================
export function Footer() {
  // スクロールをスムーズにトップへ移動
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* トップへ戻るボタン */}
        <motion.div {...fadeInUp()} className="mb-8">
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12"
            aria-label="トップに戻る"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>

        {/* SNSリンク */}
        <motion.div {...fadeInUp(0.1)} className="flex space-x-4 mb-6">
          <SocialLink href="https://github.com/KoenigWolf" icon={Github} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/toshikisakuta/" icon={Linkedin} label="LinkedIn" />
          <SocialLink href="mailto:toshikiii7@outlook.com" icon={Mail} label="メール" />
        </motion.div>

        {/* コピーライト */}
        <motion.p {...fadeInUp(0.2)} className="text-gray-600 dark:text-gray-400 font-noto-sans-jp text-center">
          © {currentYear} Toshiki Sakuta. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

// =====================================
// SNSリンクコンポーネント
// =====================================
interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => (
  <Button size="icon" variant="ghost" asChild aria-label={label}>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="h-5 w-5" />
    </a>
  </Button>
);
