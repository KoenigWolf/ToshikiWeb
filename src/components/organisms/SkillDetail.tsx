"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/Card";
import { Badge } from "@/components/ui/badge";
import { skills, getSkillsByCategory } from "@/lib/profile";
import { getProjectsByTechnology } from "@/lib/projects";
import type { Project } from "@/lib/types";

// =====================================
// スキル詳細表示コンポーネント
// =====================================

export interface SkillDetailProps {
  category: string;
}

export function SkillDetail({ category }: SkillDetailProps) {
  const [skillItems, setSkillItems] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // スキルカテゴリに基づいてデータを取得
    const skillCategory = skills.find(s => s.category === category);
    
    if (skillCategory) {
      setSkillItems(skillCategory.items);
      
      // 関連プロジェクトの取得（最初のスキルアイテムに基づく）
      if (skillCategory.items.length > 0) {
        const relatedProjects = getProjectsByTechnology(skillCategory.items[0]);
        setProjects(relatedProjects);
      }
    }
    
    setLoading(false);
  }, [category]);

  if (loading) {
    return <div className="container mx-auto px-4 py-20">読み込み中...</div>;
  }

  if (skillItems.length === 0) {
    return <div className="container mx-auto px-4 py-20">スキルが見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link href="/#skills" passHref>
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
        <h1 className="text-3xl font-bold mb-6 font-noto-sans-jp">{category}</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">保有スキル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skillItems.map((skill) => (
                <Badge key={skill} className="px-3 py-1 text-base font-noto-sans-jp">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {projects.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-noto-sans-jp">関連プロジェクト</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/experience/${project.id}`} className="block">
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors font-noto-sans-jp">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 font-noto-sans-jp">
                      {project.company} | {project.period}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.environment.slice(0, 5).map((tech) => (
                        <Badge key={`${project.id}-${tech}`} variant="outline" className="font-noto-sans-jp">
                          {tech}
                        </Badge>
                      ))}
                      {project.environment.length > 5 && (
                        <Badge variant="outline" className="font-noto-sans-jp">
                          他{project.environment.length - 5}件
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Link href="/#skills" passHref>
            <Button variant="outline" className="font-noto-sans-jp">
              他のスキルカテゴリを見る
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 