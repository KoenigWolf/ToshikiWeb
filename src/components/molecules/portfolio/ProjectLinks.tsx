import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

// =====================================
// プロジェクトリンクコンポーネント
// GitHubリポジトリやデモサイトへのリンクボタンを表示
// Atomic Design: Molecule - 複数のAtomを組み合わせた機能コンポーネント
// =====================================

export interface ProjectLinksProps {
  /** GitHubリポジトリのURL */
  githubUrl?: string;
  
  /** デモサイトのURL */
  demoUrl?: string;
  
  /** 追加のスタイルクラス */
  className?: string;
}

/**
 * プロジェクトリンク - GitHub、デモサイトへのリンクを表示
 * @param props コンポーネントのプロパティ
 * @returns ProjectLinksコンポーネント
 */
export function ProjectLinks({ 
  githubUrl, 
  demoUrl, 
  className = "mb-12" 
}: ProjectLinksProps) {
  // リンクがどちらもない場合は何も表示しない
  if (!githubUrl && !demoUrl) {
    return null;
  }
  
  return (
    <div className={`flex gap-4 ${className}`}>
      {githubUrl && (
        <Button asChild>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub リポジトリを表示"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
      )}
      
      {demoUrl && (
        <Button asChild variant="outline">
          <a 
            href={demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="デモサイトを表示"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </a>
        </Button>
      )}
    </div>
  );
} 