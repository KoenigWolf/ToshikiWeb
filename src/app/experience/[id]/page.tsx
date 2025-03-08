import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ExperienceDetail } from "@/components/organisms/ExperienceDetail";

// =====================================
// 型定義
// =====================================
interface PageProps {
  params: { id: string };
}

// =====================================
// 指定されたIDのプロジェクトを取得する関数
// =====================================
const getProjectById = (id: string) => projects.find((project) => project.id === id);

// =====================================
// 静的パスを生成（SSG対応）
// =====================================
export async function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}

// =====================================
// Experienceの詳細ページコンポーネント
// =====================================
export default function ExperienceDetailPage({ params }: PageProps) {
  const { id } = params;
  const project = getProjectById(id);

  // プロジェクトが存在しない場合、404ページを表示
  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <ExperienceDetail projectId={id} />
    </main>
  );
}
