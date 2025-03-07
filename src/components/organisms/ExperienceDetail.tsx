"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/molecules/Card";
import { Badge } from "@/components/ui/badge";
import { getProjectById } from "@/lib/projects";
import type { Project } from "@/lib/types";

// =====================================
// 経歴詳細表示コンポーネント
// =====================================

export interface ExperienceDetailProps {
  projectId: string;
}

export function ExperienceDetail({ projectId }: ExperienceDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // プロジェクトIDに基づいてデータを取得
    const foundProject = getProjectById(projectId);
    setProject(foundProject || null);
    setLoading(false);
  }, [projectId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20">読み込み中...</div>;
  }

  if (!project) {
    return <div className="container mx-auto px-4 py-20">プロジェクトが見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link href="/#experience" passHref>
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
        <h1 className="text-3xl font-bold mb-2 font-noto-sans-jp">{project.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-noto-sans-jp">
          {project.company} | {project.period}
        </p>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <CardTitle className="text-2xl font-noto-sans-jp">概要</CardTitle>
                <CardDescription className="font-noto-sans-jp">
                  役割：{project.role}
                </CardDescription>
              </div>
              <Badge className="self-start font-noto-sans-jp">{project.role}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* プロジェクト概要 */}
              {project.overview && (
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">{project.overview}</p>
                </div>
              )}

              {/* 担当業務 */}
              <div>
                <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">担当</h4>
                <div className="flex flex-wrap gap-2">
                  {project.responsibilities.map((item) => (
                    <Badge key={item} variant="outline" className="font-noto-sans-jp">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 使用技術 */}
              <div>
                <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">環境・技術</h4>
                <div className="flex flex-wrap gap-2">
                  {project.environment.map((item) => (
                    <Badge key={item} variant="secondary" className="font-noto-sans-jp">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 詳細業務 */}
              <div>
                <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">詳細</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {project.details.map((detail) => (
                    <li key={detail} className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 成果・実績 */}
              {project.achievements && project.achievements.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 font-noto-sans-jp">成果</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {project.achievements.map((achievement) => (
                      <li key={achievement} className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/#experience" passHref>
            <Button variant="outline" className="font-noto-sans-jp">
              他のプロジェクトを見る
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 