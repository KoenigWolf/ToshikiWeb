"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Github, Linkedin, Mail, Moon, Sun, Twitter } from "lucide-react";
import { Section } from "@/components/ui/section";

export function FooterSection() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Section id="footer" variant="muted" spacing="sm" className="mt-10">
      <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
        <div>
          <Link href="/" className="text-xl font-bold md:text-2xl font-noto-sans-jp">
            Toshiki Sakuta
          </Link>
          <p className="text-sm text-gray-600 font-noto-sans-jp dark:text-gray-400">
            Web Engineer & Designer
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:your.email@example.com" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
        <p className="font-noto-sans-jp">© {new Date().getFullYear()} Toshiki Sakuta. All rights reserved.</p>
      </div>
    </Section>
  );
} 