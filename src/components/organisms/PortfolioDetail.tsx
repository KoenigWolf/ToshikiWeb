"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/Card";
import { getPortfolioItemById } from "@/lib/portfolio";
import { PortfolioItem } from "@/lib/types";

// =====================================
// ポートフォリオ詳細表示コンポーネント
// =====================================
export interface PortfolioDetailProps {
  projectId: string;
}

export function PortfolioDetail({ projectId }: PortfolioDetailProps) {
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // lib/portfolioからデータを取得
    const foundProject = getPortfolioItemById(projectId);
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
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        戻る
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {project.details.overview}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.details.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-12">
          {project.githubUrl && (
            <Button asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button asChild variant="outline">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>主な機能</CardTitle>
            <CardDescription>このプロジェクトの特徴</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.details.features.map((feature, featureIndex) => (
                <li key={`feature-${featureIndex}`} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 