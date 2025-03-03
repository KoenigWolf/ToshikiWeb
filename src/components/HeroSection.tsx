"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function HeroSection() {
  // 履歴書をダウンロードする関数
  const handleDownloadResume = () => {
    // PDFファイルへのパスを指定
    const pdfPath = "/resume.pdf";
    
    // aタグを作成してダウンロード処理を実行
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Toshiki Sakuta_履歴書.pdf"; // ダウンロード時のファイル名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // お問い合わせメールを開く関数
  const handleContactClick = () => {
    // メールアドレスと件名、本文を設定
    const email = "admin@bigonionawaji.onmicrosoft.com";
    const subject = "ポートフォリオサイトからのお問い合わせ";
    const body = "お問い合わせ内容をご記入ください。\n\n名前：\n連絡先：\n内容：";
    
    // メーラーを起動するURLを作成
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // メーラーを起動
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="inline-block relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
                TS
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
                className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
              >
                <div className="bg-green-500 w-4 h-4 rounded-full" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-noto-sans-jp"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-noto-sans-jp"
          >
            クラウド技術 / 業務自動化 / Web開発
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mb-8 text-gray-700 dark:text-gray-300 font-noto-sans-jp"
          >
            <p>{personalInfo.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="gap-2" onClick={handleDownloadResume}>
              <FileText className="h-4 w-4" />
              <span className="font-noto-sans-jp">履歴書をダウンロード</span>
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleContactClick}>
              <Mail className="h-4 w-4" />
              <span className="font-noto-sans-jp">お問い合わせ</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16"
          >
            <a
              href="#experience"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowDown className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 