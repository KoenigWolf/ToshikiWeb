"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/molecules/Card";

// =====================================
// ポートフォリオ詳細表示コンポーネント
// =====================================

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

// このデータは本来はAPIやデータベースから取得する
const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Next.js, TypeScript, TailwindCSSで構築した個人ポートフォリオサイト",
    longDescription: "パフォーマンス、アクセシビリティ、SEOを重視した最新のNext.jsとReactフレームワークを使用して構築された個人ポートフォリオサイトです。Atomic Designパターンとモダンな開発プラクティスを取り入れています。",
    imageUrl: "/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Shadcn UI"],
    githubUrl: "https://github.com/example/portfolio",
    liveUrl: "https://example.com",
    features: [
      "最新のNext.js 15 App Routerアーキテクチャ",
      "タイプセーフな開発環境",
      "アトミックデザインによるコンポーネント構造",
      "滑らかなページトランジションとアニメーション",
      "完全にレスポンシブなデザイン",
      "アクセシビリティ対応"
    ]
  }
];

export interface PortfolioDetailProps {
  projectId: string;
}

export function PortfolioDetail({ projectId }: PortfolioDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得する
    const foundProject = projects.find(p => p.id === projectId);
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
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
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
          {project.liveUrl && (
            <Button asChild variant="outline">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
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