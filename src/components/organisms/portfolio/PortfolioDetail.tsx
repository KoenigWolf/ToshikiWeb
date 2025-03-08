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

// =====================================
// Types
// =====================================
export interface PortfolioDetailProps {
  /**
   * プロジェクトID
   */
  projectId: string;
}

// =====================================
// Constants
// =====================================
/**
 * アニメーション設定
 */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// =====================================
// Sub Components
// =====================================
/**
 * ロード中の表示
 */
const LoadingState = () => (
  <div className="container mx-auto px-4 py-20">
    <motion.div {...ANIMATION_CONFIG}>読み込み中...</motion.div>
  </div>
);

/**
 * プロジェクト未見つかり時のエラー表示
 */
const ProjectNotFound = () => (
  <div className="container mx-auto px-4 py-20">
    <motion.div {...ANIMATION_CONFIG}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">プロジェクトが見つかりませんでした</h2>
        <BackButton />
      </div>
    </motion.div>
  </div>
);

// =====================================
// Main Component
// =====================================
/**
 * ポートフォリオ詳細 - プロジェクトの詳細情報を表示
 * 
 * Atomic Design:
 * - Organism: 複数のMoleculeとAtomを組み合わせた独立セクション
 * - 依存: TechnologyBadge, ProjectLinks, FeaturesList, BackButton, ProjectImage
 * 
 * @param {PortfolioDetailProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ポートフォリオ詳細コンポーネント
 */
export function PortfolioDetail({ projectId }: PortfolioDetailProps) {
  // ステート
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
    return <LoadingState />;
  }

  // プロジェクトが見つからない場合のエラー表示
  if (!project) {
    return <ProjectNotFound />;
  }

  // メインコンテンツの表示
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <BackButton />

      <motion.div {...ANIMATION_CONFIG}>
        {/* プロジェクト画像 */}
        <ProjectImage 
          src={project.thumbnail} 
          alt={project.title} 
        />

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