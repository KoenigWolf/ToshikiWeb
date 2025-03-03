// =============================
// 個人情報の型
// =============================
export interface PersonalInfo {
  name: string;
  nameEn: string;
  summary: string;
}

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

// =============================
// 資格の型
// =============================
export interface Certification {
  id: string;
  name: string;
  date: string;
  issuer?: string;
}

// =============================
// スキルの型
// =============================
export interface SkillCategory {
  category: string;
  items: string[];
}

// =============================
// ポートフォリオの型
// =============================
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  details: {
    overview: string;
    features: string[];
    technologies: string[];
    challenges: string;
    solutions: string;
    images: string[];
  };
} 