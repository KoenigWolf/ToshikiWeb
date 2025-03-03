// =====================================
// 個人情報、資格、Skill、PRを管理するファイル
// =====================================
// このファイルは、プロフィールセクションに表示される個人情報、取得資格、
// Skillセット、PRなどの情報を定義します。

import type { PersonalInfo, Certification, SkillCategory } from "./types";

// =====================================
// 個人情報
// =====================================
// 名前、英語名、自己紹介文などの基本的な個人情報を定義します。
export const personalInfo: PersonalInfo = {
  name: "Toshiki Sakuta",
  nameEn: "Toshiki Sakuta",
  summary: "クラウド技術、業務自動化、インフラ運用、Web開発を経験。Microsoft Azure を活用し、生産性向上に貢献。PM経験を活かし、課題分析と最適な技術提案を実施。Microsoft 365・Dynamics 365 導入、セキュリティ対策、データ分析基盤構築を担当。",
};

// =====================================
// 取得資格リスト
// =====================================
// 各資格には以下の情報が含まれます：
// - id: 資格の一意識別子
// - name: 資格名
// - date: 取得日
// - issuer: 発行機関（オプション）
export const certifications: Certification[] = [
  {
    id: "az-900",
    name: "AZ-900：Microsoft Azure Fundamentals",
    date: "2023年1月"
  },
  {
    id: "pl-900",
    name: "PL-900：Power Platform Fundamentals",
    date: "2022年8月"
  },
  {
    id: "drivers-license",
    name: "普通自動車免許第一種",
    date: "2010年4月"
  }
];

// =====================================
// Skillカテゴリーリスト
// =====================================
// 各カテゴリには以下の情報が含まれます：
// - category: カテゴリ名
// - items: そのカテゴリに属するSkill項目の配列
export const skills: SkillCategory[] = [
  { category: "フロントエンド", items: ["React", "Next.js", "TailwindCSS", "HTML/CSS", "JavaScript/TypeScript"] },
  { category: "バックエンド", items: ["Node.js", "Express", "REST API"] },
  { category: "クラウド", items: ["Microsoft Azure", "AWS", "Azure Functions", "Azure Logic Apps"] },
  { category: "データベース", items: ["SQL", "Dataverse"] },
  { category: "ツール・その他", items: ["Git", "Power Platform", "Microsoft 365", "Dynamics 365", "Excel VBA"] },
  { category: "セキュリティ", items: ["Azure Security", "Defender for Cloud", "Sentinel", "ゼロトラストセキュリティ"] }
];

// =====================================
// PR文
// =====================================
// PRとして表示されるテキスト。経験、強み、価値観などを含みます。
export const selfPR = `クラウド技術・業務自動化・インフラ運用の知見を活かし、Microsoft Azure や Power Platform を用いたシステム設計・自動化を得意とする。業務フローの自動化により手作業を削減し、データ可視化と意思決定のスピード向上を実現。
接客業の経験から、ユーザー視点での課題解決を重視。技術だけでなくビジネス視点を持ち、現場に寄り添った最適なソリューションを提供。常に学び、チームでの成長を目指す。`;

// =====================================
// Skillをカテゴリでフィルタリングする関数
// =====================================
// @param category フィルタリングするカテゴリ名
// @returns 指定されたカテゴリのSkill項目、または空の配列
export function getSkillsByCategory(category: string): string[] {
  const skillCategory = skills.find(skill => skill.category === category);
  return skillCategory ? skillCategory.items : [];
}

// =====================================
// すべてのSkill項目を取得する関数
// =====================================
// @returns すべてのSkill項目を含む配列
export function getAllSkills(): string[] {
  return skills.flatMap(category => category.items);
}

// =====================================
// 資格を日付順にソートする関数（新しい順）
// =====================================
// @returns 日付でソートされた資格配列のコピー
export function getSortedCertificationsByDate(): Certification[] {
  return [...certifications].sort((a, b) => {
    // 日本語の日付文字列（例: "2023年1月"）を比較
    return b.date.localeCompare(a.date);
  });
} 