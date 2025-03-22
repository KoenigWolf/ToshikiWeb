// サーバーコンポーネントに変換
import { DetailLayout } from "@/components/common/DetailLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjectById } from "@/lib/projects";
import type { Project } from "@/lib/projects";

// =====================================
// 経歴詳細表示コンポーネント
// =====================================
export interface ExperienceDetailProps {
  projectId: string;
}

export function ExperienceDetail({ projectId }: ExperienceDetailProps) {
  // サーバーサイドでデータを直接取得
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <DetailLayout backText="プロジェクト一覧に戻る" backPath="/#experience">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-500 font-noto-sans-jp">
              プロジェクトが見つかりません
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-noto-sans-jp">
              指定されたプロジェクトIDに対応するプロジェクトが見つかりませんでした。
            </p>
          </CardContent>
        </Card>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout 
      title={project.title} 
      backText="プロジェクト一覧に戻る" 
      backPath="/#experience"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-noto-sans-jp">{project.title}</CardTitle>
              <CardDescription className="mt-1 font-noto-sans-jp">
                {project.company} | {project.period}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag: string) => (
                <Badge key={`tag-${tag}`} variant="secondary" className="text-xs font-noto-sans-jp">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* プロジェクト概要 */}
          <section className="mb-8">
            <h3 className="mb-3 text-xl font-bold font-noto-sans-jp">概要</h3>
            <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
              {project.summary}
            </p>
          </section>
          
          {/* 役割と責任 */}
          {project.responsibilities && (
            <section className="mb-8">
              <h3 className="mb-3 text-xl font-bold font-noto-sans-jp">役割と責任</h3>
              <ul className="pl-5 text-gray-700 list-disc dark:text-gray-300 font-noto-sans-jp">
                {project.responsibilities.map((item: string, index: number) => (
                  <li key={`resp-${item.substring(0, 10)}-${index}`} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* 使用技術 */}
          {project.technologies && (
            <section className="mb-8">
              <h3 className="mb-3 text-xl font-bold font-noto-sans-jp">使用技術</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge key={`tech-${tech}`} className="font-noto-sans-jp">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
          )}
          
          {/* 詳細業務 */}
          {project.tasks && (
            <section className="mb-8">
              <h3 className="mb-3 text-xl font-bold font-noto-sans-jp">詳細業務</h3>
              <ul className="pl-5 text-gray-700 list-disc dark:text-gray-300 font-noto-sans-jp">
                {project.tasks.map((task: string, index: number) => (
                  <li key={`task-${task.substring(0, 10)}-${index}`} className="mb-2">
                    {task}
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* 成果 */}
          {project.achievements && (
            <section>
              <h3 className="mb-3 text-xl font-bold font-noto-sans-jp">成果</h3>
              <ul className="pl-5 text-gray-700 list-disc dark:text-gray-300 font-noto-sans-jp">
                {project.achievements.map((achievement: string, index: number) => (
                  <li key={`achievement-${achievement.substring(0, 10)}-${index}`} className="mb-2">
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </CardContent>
      </Card>
    </DetailLayout>
  );
} 