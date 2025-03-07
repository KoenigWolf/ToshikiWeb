"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User, Mail, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Badge } from "@/components/ui/badge";
import { personalInfo, selfPR } from "@/lib/profile";
import { getAllSkills } from "@/lib/profile";

// =====================================
// プロフィール詳細表示コンポーネント
// =====================================

export function AboutDetail() {
  const allSkills = getAllSkills();
  
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link href="/#about" passHref>
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 font-noto-sans-jp">自己紹介</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 font-noto-sans-jp">
          {personalInfo.name}のプロフィール
        </p>

        {/* 基本情報カード */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                名前：{personalInfo.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                英語名：{personalInfo.nameEn}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                メール：toshikiii7@outlook.com
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                所在地：東京都
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 自己PR */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">自己PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selfPR.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed font-noto-sans-jp">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* スキルタグ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">保有スキル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <Badge key={skill} className="font-noto-sans-jp">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 経歴概要 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">経歴概要</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
              <div className="flex-none">
                <div className="rounded-full bg-primary w-3 h-3 -ml-[0.6875rem]"></div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-noto-sans-jp">2022-現在</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold font-noto-sans-jp">Microsoft Azure セキュリティエンジニア</h4>
                <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">日本コンセントリクス株式会社</p>
              </div>
            </div>
            
            <div className="flex gap-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6">
              <div className="flex-none">
                <div className="rounded-full bg-primary w-3 h-3 -ml-[0.6875rem]"></div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-noto-sans-jp">2020-2022</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold font-noto-sans-jp">Microsoft 365 エンジニア</h4>
                <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">日本コンセントリクス株式会社</p>
              </div>
            </div>
            
            <div className="flex gap-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
              <div className="flex-none">
                <div className="rounded-full bg-primary w-3 h-3 -ml-[0.6875rem]"></div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-noto-sans-jp">2017-2020</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold font-noto-sans-jp">不動産営業・電気回路設計</h4>
                <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">複数社</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/#about" passHref>
            <Button variant="outline" className="font-noto-sans-jp">
              トップページに戻る
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 