// =====================================
// アプリケーションのデータをエクスポートするインデックスファイル
// =====================================
// このファイルは、分割された各データファイルからエクスポートを集約し、
// アプリケーション全体で使用できるようにします。
// 
// 注: このファイルは後方互換性のために維持されています。
// 新しいコードでは、各専用ファイル（profile.ts, projects.ts, portfolio.ts）から
// 直接インポートすることをお勧めします。

// =====================================
// プロフィール関連のデータをインポート
// =====================================
export { 
  personalInfo,
  certifications,
  skills,
  selfPR,
  getSkillsByCategory,
  getAllSkills,
  getSortedCertificationsByDate
} from './profile';

// =====================================
// プロジェクト関連のデータをインポート
// =====================================
export {
  projects,
  getProjectById,
  getProjectsByCompany,
  getSortedProjectsByDate
} from './projects';

// =====================================
// Portfolio関連のデータをインポート
// =====================================
export {
  portfolioItems,
  getPortfolioItemById,
  getPortfolioItemsByTag,
  getAllPortfolioTags
} from './portfolio';

// =====================================
// 型定義をエクスポート（後方互換性のため）
// =====================================
export type { 
  PersonalInfo, 
  Project, 
  Certification, 
  SkillCategory, 
  PortfolioItem 
} from './types';
