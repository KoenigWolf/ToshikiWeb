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
// Types
// =====================================
export interface PortfolioDetailProps {
  projectId: string;
}

// =====================================
// Constants
// =====================================
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// =====================================
// Helper Components
// =====================================
const TechnologyBadge = ({ tech }: { tech: string }) => (
  <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
    {tech}
  </span>
);

const ProjectLinks = ({ githubUrl, demoUrl }: { githubUrl?: string; demoUrl?: string }) => (
  <div className="flex gap-4 mb-12">
    {githubUrl && (
      <Button asChild>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </a>
      </Button>
    )}
    {demoUrl && (
      <Button asChild variant="outline">
        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Live Demo
        </a>
      </Button>
    )}
  </div>
);

const FeaturesList = ({ features }: { features: string[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>主な機能</CardTitle>
      <CardDescription>このプロジェクトの特徴</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <span className="mr-2 text-primary">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// =====================================
// Main Component
// =====================================
export function PortfolioDetail({ projectId }: PortfolioDetailProps) {
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  // プロジェクトデータの取得
  useEffect(() => {
    const loadProject = () => {
      try {
        const foundProject = getPortfolioItemById(projectId);
        setProject(foundProject || null);
      } catch (error) {
        console.error('Failed to load project:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  // ローディング状態の表示
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div {...ANIMATION_CONFIG}>読み込み中...</motion.div>
      </div>
    );
  }

  // プロジェクトが見つからない場合のエラー表示
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div {...ANIMATION_CONFIG}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">プロジェクトが見つかりませんでした</h2>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              戻る
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // メインコンテンツの表示
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

      <motion.div {...ANIMATION_CONFIG}>
        {/* プロジェクト画像 */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* プロジェクトタイトルと概要 */}
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {project.details.overview}
        </p>

        {/* 使用技術タグ */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.details.technologies.map((tech) => (
            <TechnologyBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* プロジェクトリンク */}
        <ProjectLinks
          githubUrl={project.githubUrl}
          demoUrl={project.demoUrl}
        />

        {/* 機能一覧 */}
        <FeaturesList features={project.details.features} />
      </motion.div>
    </div>
  );
} 