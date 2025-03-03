"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

// =====================================
// 定数: 設定情報（履歴書のパス、メール情報）
// =====================================
const RESUME_FILE_PATH = "/resume.pdf";
const CONTACT_EMAIL = "toshikiii7@outlook.com";
const EMAIL_SUBJECT = "Portfolioサイトからのお問い合わせ";
const EMAIL_BODY = "お問い合わせ内容をご記入ください。\n\n名前：\n連絡先：\n内容：";

// =====================================
// 関数: ファイルのダウンロード
// =====================================
const downloadFile = (filePath: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// =====================================
// 関数: メールクライアントを開く
// =====================================
const openMailClient = (email: string, subject: string, body: string) => {
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
};

// =====================================
// HeroSection コンポーネント
// =====================================
export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 text-center">
        {/* プロフィールアイコン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Image 
              src="/Toshiki.png" 
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

        {/* 名前 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-noto-sans-jp"
        >
          {personalInfo.name}
        </motion.h1>

        {/* サブタイトル */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-noto-sans-jp"
        >
          クラウド技術 / 業務自動化 / Web開発
        </motion.h2>

        {/* 自己紹介文 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 font-noto-sans-jp mb-8"
        >
          {personalInfo.summary}
        </motion.p>

        {/* ボタン（履歴書ダウンロード & お問い合わせ） */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            className="gap-2"
            onClick={() => downloadFile(RESUME_FILE_PATH, "Toshiki Sakuta_履歴書.pdf")}
          >
            <FileText className="h-4 w-4" />
            <span className="font-noto-sans-jp">履歴書をダウンロード</span>
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => openMailClient(CONTACT_EMAIL, EMAIL_SUBJECT, EMAIL_BODY)}
          >
            <Mail className="h-4 w-4" />
            <span className="font-noto-sans-jp">お問い合わせ</span>
          </Button>
        </motion.div>

        {/* スクロールダウンボタン */}
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
    </section>
  );
}
