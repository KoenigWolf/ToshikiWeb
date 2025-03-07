"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

// =====================================
// サイト全体のヘッダーコンポーネント
// =====================================
const navItems = [
  { name: "Home", href: "#home" },
  { name: "Career", href: "#experience" },
  { name: "Skill", href: "#skills" },
  { name: "Shikaku", href: "#certifications" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "PR", href: "#about" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="#home" className="text-xl font-bold">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-noto-sans-jp"
          >
            Toshiki Sakuta
          </motion.div>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-noto-sans-jp"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="flex space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="icon" variant="ghost" asChild>
                <a href="https://github.com/KoenigWolf" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button size="icon" variant="ghost" asChild>
                <a href="https://www.linkedin.com/in/toshikisakuta/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button size="icon" variant="ghost" asChild>
                <a href="mailto:toshikiii7@outlook.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* モバイルメニューボタン */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* モバイルナビゲーション */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-noto-sans-jp"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-2 mt-4">
              <Button size="icon" variant="ghost" asChild>
                <a href="https://github.com/KoenigWolf" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="https://www.linkedin.com/in/toshikisakuta/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="mailto:toshikiii7@outlook.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
} 