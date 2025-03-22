// サーバーコンポーネントに変換
import { DetailLayout } from "@/components/common/DetailLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills, getSkillsByCategory } from "@/lib/profile";
import { getProjectsByTechnology } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import type { SkillCategory } from "@/lib/profile";
import Link from "next/link";

// =====================================
// スキル詳細表示コンポーネント
// =====================================

export interface SkillDetailProps {
  category: string;
}

export function SkillDetail({ category }: SkillDetailProps) {
  // サーバーサイドでデータを直接取得
  const skillCategory = skills.find((s: SkillCategory) => s.category === category);
  const skillItems = skillCategory ? skillCategory.items : [];
  const projects = getProjectsByTechnology(category);

  if (skillItems.length === 0) {
    return (
      <DetailLayout backText="スキル一覧に戻る" backPath="/#skills">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-500 font-noto-sans-jp">
              スキルが見つかりません
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-noto-sans-jp">
              指定されたスキルカテゴリは存在しないか、スキルが登録されていません。
            </p>
          </CardContent>
        </Card>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout 
      title={`${category} スキル`} 
      backText="スキル一覧に戻る" 
      backPath="/#skills"
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-noto-sans-jp">スキル一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillItems.map((skill: string) => (
              <Badge key={`skill-${skill}`} className="font-noto-sans-jp">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-noto-sans-jp">関連プロジェクト</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="pl-5 space-y-2 list-disc">
              {projects.map((project: Project) => (
                <li key={project.id} className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                  <Link 
                    href={`/experience/${project.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {project.title}
                  </Link>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {project.company}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </DetailLayout>
  );
} 