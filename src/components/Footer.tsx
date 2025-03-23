"use client";

import Link from "next/link";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// アニメーション設定
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

// SNSリンク定義（追加・変更が簡単）
const SNS_LINKS = [
  { href: "https://github.com/KoenigWolf", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/toshikisakuta/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:creatorsoasis@outlook.com", icon: Mail, label: "メール" },
];

// フッターコンポーネント
export function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-muted text-muted-foreground">
      <div className="container flex flex-col items-center px-4 mx-auto">
        {/* トップへ戻る */}
        <motion.div {...fadeInUp()} className="mb-8">
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
            aria-label="トップに戻る"
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* SNSリンク */}
        <motion.div {...fadeInUp(0.1)} className="flex mb-6 space-x-4">
          {SNS_LINKS.map(({ href, icon: Icon, label }) => (
            <Button
              key={label}
              asChild
              size="icon"
              variant="ghost"
              aria-label={label}
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-5 h-5" />
              </a>
            </Button>
          ))}
        </motion.div>

        {/* コピーライト */}
        <motion.p
          {...fadeInUp(0.2)}
          className="text-sm text-center font-noto-sans-jp"
        >
          © {year} Toshiki Sakuta. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
