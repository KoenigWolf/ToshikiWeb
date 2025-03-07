import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ExperienceDetail } from "@/components/organisms/ExperienceDetail";

// =====================================
// 静的パスを生成
// =====================================
export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

// =====================================
// Experienceの詳細ページ
// =====================================
interface PageProps {
  params: {
    id: string;
  };
}

export default function ExperienceDetailPage({ params }: PageProps) {
  const { id } = params;
  const project = projects.find((project) => project.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <ExperienceDetail projectId={id} />
    </main>
  );
} 