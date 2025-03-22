// プロファイルデータをエクスポートするファイル

import { personalInfo, certifications, skills,
  getSkillsByCategory, getAllSkills, getSortedCertificationsByDate } from './data/profile';

export {
  personalInfo,
  certifications,
  skills,
  getSkillsByCategory,
  getAllSkills,
  getSortedCertificationsByDate
};

// 型定義をインポートしてエクスポート
import type { PersonalInfo, Certification, SkillCategory } from './types/index';
export type { PersonalInfo, Certification, SkillCategory }; 