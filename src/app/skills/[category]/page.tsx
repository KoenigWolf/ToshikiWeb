import { notFound } from "next/navigation";
import { skills } from "@/lib/profile";
import { SkillDetail } from "@/components/features/SkillDetail";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import type { SkillCategory } from "@/lib/profile";
import type { Metadata } from "next";

// =====================================
// 型定義
// =====================================
interface PageProps {
  params: {
    category: string;
  };
}

// =====================================
// 静的パスを生成
// =====================================
export async function generateStaticParams() {
  return skills.map((skill: SkillCategory) => ({ 
    category: encodeURIComponent(skill.category) 
  }));
}

// =====================================
// メタデータを動的に生成
// =====================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.category);
  const skillCategory = skills.find((skill: SkillCategory) => skill.category === category);

  if (!skillCategory) {
    return createMetadata({
      title: 'スキル詳細',
      description: 'スキル詳細ページ',
      noIndex: true
    });
  }

  return createMetadata({
    title: skillCategory.category,
    description: `${skillCategory.category}に関する技術スキルの詳細`,
    keywords: [...skillCategory.items],
  });
}

// =====================================
// Skillsの詳細ページ
// =====================================
export default function SkillDetailPage({ params }: PageProps) {
  const category = decodeURIComponent(params.category);
  const skillCategory = skills.find((skill: SkillCategory) => skill.category === category);

  if (!skillCategory) {
    notFound();
  }

  return <SkillDetail category={category} />;
} 