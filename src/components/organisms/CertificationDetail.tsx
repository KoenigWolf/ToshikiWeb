"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Building } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/Card";
import { certifications } from "@/lib/profile";
import type { Certification } from "@/lib/types";

// =====================================
// 資格詳細表示コンポーネント
// =====================================

export interface CertificationDetailProps {
  certId: string;
}

export function CertificationDetail({ certId }: CertificationDetailProps) {
  const [certification, setCertification] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 資格IDに基づいてデータを取得
    const foundCert = certifications.find(cert => cert.id === certId);
    setCertification(foundCert || null);
    setLoading(false);
  }, [certId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20">読み込み中...</div>;
  }

  if (!certification) {
    return <div className="container mx-auto px-4 py-20">資格が見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link href="/#certifications" passHref>
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
        <h1 className="text-3xl font-bold mb-6 font-noto-sans-jp">{certification.name}</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">資格詳細</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                取得日：{certification.date}
              </span>
            </div>
            
            {certification.issuer && (
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                  発行元：{certification.issuer}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 資格に関する追加情報 */}
        {certId === "az-900" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-noto-sans-jp">Microsoft Azure Fundamentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                Microsoft Azure の基礎知識を証明する資格です。クラウドの概念やAzureのサービス、セキュリティ、プライバシー、コンプライアンス、料金体系などの理解を評価します。
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                この資格は、Azure上でのサービス展開と管理の基礎となる知識を習得したことを示しています。
              </p>
            </CardContent>
          </Card>
        )}

        {certId === "pl-900" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-noto-sans-jp">Power Platform Fundamentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                Microsoft Power Platform（Power BI、Power Apps、Power Automate、Power Virtual Agents）の基礎知識を証明する資格です。
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                この資格は、ローコード開発やビジネスデータの分析・可視化、業務プロセスの自動化に関する基本的な知識を習得したことを示しています。
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Link href="/#certifications" passHref>
            <Button variant="outline" className="font-noto-sans-jp">
              他の資格を見る
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 