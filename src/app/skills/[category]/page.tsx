import { notFound } from "next/navigation";
import { skills } from "@/lib/profile";
import { SkillDetail } from "@/components/organisms/SkillDetail";

// =====================================
// 静的パスを生成
// =====================================
export async function generateStaticParams() {
  return skills.map((skill) => ({ 
    category: encodeURIComponent(skill.category) 
  }));
}

// =====================================
// Skillsの詳細ページ
// =====================================
interface PageProps {
  params: {
    category: string;
  };
}

export default function SkillDetailPage({ params }: PageProps) {
  const category = decodeURIComponent(params.category);
  const skillCategory = skills.find((skill) => skill.category === category);

  if (!skillCategory) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <SkillDetail category={category} />
    </main>
  );
} 