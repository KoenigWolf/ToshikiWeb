"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPortfolioItemById } from "@/lib/portfolio";
import type { PortfolioItem } from "@/lib/types";
import { BackButton } from "@/components/atoms/BackButton";
import { TechnologyBadge } from "@/components/atoms/TechnologyBadge";
import { ProjectImage } from "@/components/atoms/ProjectImage";
import { ProjectLinks } from "@/components/molecules/portfolio/ProjectLinks";
import { FeaturesList } from "@/components/molecules/portfolio/FeaturesList";

// Types
export interface PortfolioDetailProps {
  projectId: string; // プロジェクトID
}

// Constants
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 }, // 初期状態: 透明度0, 下に20px
  animate: { opacity: 1, y: 0 },  // 表示状態: 透明度1, 元の位置
  transition: { duration: 0.5 },  // 遷移時間: 0.5秒
};

// Loading表示用コンポーネント
const LoadingState = () => (
  <div className="container px-4 py-20 mx-auto">
    <motion.div {...ANIMATION_CONFIG}>読み込み中...</motion.div>
  </div>
);

// プロジェクトが見つからなかった場合の表示コンポーネント
const ProjectNotFound = () => (
  <div className="container px-4 py-20 mx-auto">
    <motion.div {...ANIMATION_CONFIG}>
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">プロジェクトが見つかりませんでした</h2>
        <BackButton />
      </div>
    </motion.div>
  </div>
);

// PortfolioDetailコンポーネント
export function PortfolioDetail({ projectId }: PortfolioDetailProps) {
  const [project, setProject] = useState<PortfolioItem | null>(null); // プロジェクトデータ
  const [loading, setLoading] = useState(true); // ローディング状態

  // プロジェクトデータの取得処理
  useEffect(() => {
    const loadProject = () => {
      try {
        const foundProject = getPortfolioItemById(projectId); // プロジェクト取得
        setProject(foundProject || null);
      } catch (error) {
        console.error("Failed to load project:", error);
        setProject(null);
      } finally {
        setLoading(false); // ローディング完了
      }
    };
    loadProject();
  }, [projectId]);

  if (loading) return <LoadingState />; // ローディング中の場合の表示
  if (!project) return <ProjectNotFound />; // プロジェクト未取得の場合の表示

  return (
    <div className="container max-w-4xl px-4 py-20 mx-auto">
      {/* 戻るボタン */}
      <BackButton />

      <motion.div {...ANIMATION_CONFIG}>
        {/* プロジェクト画像 */}
        <ProjectImage src={project.thumbnail} alt={project.title} />

        {/* プロジェクトタイトル */}
        <h1 className="mb-4 text-3xl font-bold">{project.title}</h1>

        {/* プロジェクト概要 */}
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          {project.details.overview}
        </p>

        {/* 使用技術のバッジリスト */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.details.technologies.map((tech) => (
            <TechnologyBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* プロジェクトリンク */}
        <ProjectLinks githubUrl={project.githubUrl} demoUrl={project.demoUrl} />

        {/* 機能一覧 */}
        <FeaturesList features={project.details.features} />
      </motion.div>
    </div>
  );
}
