// =============================
// プロジェクトの型
// =============================
export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  role: string;
  responsibilities: string[];
  environment: string[];
  overview?: string;
  details: string[];
  achievements?: string[];
}