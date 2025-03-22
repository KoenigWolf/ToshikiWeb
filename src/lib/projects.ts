// プロジェクトデータをエクスポートするファイル

import { projects, getProjectById, getProjectsByCompany, 
  getSortedProjectsByDate, getProjectsByTechnology, 
  getProjectsByRole, getAllTechnologies } from './data/projects';

export {
  projects,
  getProjectById,
  getProjectsByCompany,
  getSortedProjectsByDate,
  getProjectsByTechnology,
  getProjectsByRole,
  getAllTechnologies
};

// 型定義をインポートしてエクスポート
import type { Project } from './types/project';
export type { Project }; 