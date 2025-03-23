// data/index.ts
// アプリ内データの集約エクスポートファイル（後方互換のためのエントリーポイント）
// 新規コードでは各モジュールからの直接インポートを推奨

// ========== プロフィール ==========
export {
  personalInfo,
  certifications,
  skills,
  selfPR,
  getSkillsByCategory,
  getAllSkills,
  getSortedCertificationsByDate,
} from "./profile";

// ========== プロジェクト ==========
export {
  projects,
  getProjectById,
  getProjectsByCompany,
  getSortedProjectsByDate,
} from "./projects";

// ========== ポートフォリオ ==========
export {
  portfolioItems,
  getPortfolioItemById,
  getPortfolioItemsByTag,
  getAllPortfolioTags,
} from "./portfolio";

// ========== 型定義（後方互換用） ==========
export type {
  PersonalInfo,
  Project,
  Certification,
  SkillCategory,
  PortfolioItem,
} from "./types";
