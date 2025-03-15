"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, User, Mail, MapPin, Globe } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
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
    <div className="container max-w-4xl px-4 py-20 mx-auto">
      <Link href="/#about" passHref>
        <Button
          variant="ghost"
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          戻る
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold font-noto-sans-jp">自己紹介</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400 font-noto-sans-jp">
          {personalInfo.name}のプロフィール
        </p>

        {/* 基本情報カード */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                名前：{personalInfo.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                英語名：{personalInfo.nameEn}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                メール：creatorsoasis@outlook.com
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
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
              {selfPR.split('\n').map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-gray-700 dark:text-gray-300 font-noto-sans-jp">
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
          <CardContent>
            <Timeline data={[
              {
                title: "2022-現在",
                content: (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-noto-sans-jp">Microsoft Azure セキュリティエンジニア</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                      日本コンセントリクス株式会社にて、Microsoft Azure のセキュリティ関連サービスの設計・構築・運用に従事。
                      主にMicrosoft Defender for Cloud、Microsoft Sentinel、Microsoft Entra ID (旧 Azure AD) などのサービスを担当。
                    </p>
                  </div>
                ),
              },
              {
                title: "2020-2022",
                content: (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-noto-sans-jp">Microsoft 365 エンジニア</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                      日本コンセントリクス株式会社にて、Microsoft 365 の導入・構築・運用を担当。
                      Exchange Online、SharePoint Online、Teams などの主要サービスの技術支援に従事。
                    </p>
                  </div>
                ),
              },
              {
                title: "2017-2020",
                content: (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-noto-sans-jp">不動産営業・電気回路設計</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                      複数の企業で不動産営業および電気回路設計の業務に従事。
                      顧客との折衝や技術的な課題解決など、多様な経験を積む。
                    </p>
                  </div>
                ),
              }
            ]} />
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