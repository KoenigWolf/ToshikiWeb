import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/common/ExperienceDetail";
import { getProjectById } from "@/lib/projects"; 
import type { Project } from "@/lib/projects";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";


// 型定義

interface PageProps {
  params: {
    id: string;
  };
}


// メタデータを動的に生成

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;
  const project = getProjectById(id);

  if (!project) {
    return createMetadata({
      title: 'プロジェクト詳細',
      description: 'プロジェクト詳細ページ',
      noIndex: true
    });
  }

  return createMetadata({
    title: project.title,
    description: project.summary || 'プロジェクト詳細ページ',
    keywords: [...project.tags || [], ...project.technologies || []],
  });
}


// 静的パスを生成

export async function generateStaticParams() {
  // Note: 実際の実装では全てのプロジェクトIDを含める
  // 例: return getAllProjects().map(project => ({ id: project.id }));
  return [
    { id: 'project-1' },
    { id: 'project-2' },
    // その他の静的に生成するプロジェクトID
  ];
}


// プロジェクト詳細ページ

export default function ExperienceDetailPage({ params }: PageProps) {
  const { id } = params;
  
  // プロジェクトの存在確認
  const project = getProjectById(id);
  if (!project) {
    notFound();
  }
  
  return <ExperienceDetail projectId={id} />;
}
