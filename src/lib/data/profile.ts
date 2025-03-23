// data/profile.ts
// プロフィール情報（個人情報・資格・スキル・PR）と関連ユーティリティ

import type { PersonalInfo, Certification, SkillCategory } from "./types";

/* ────────────────────
  個人情報
──────────────────── */
export const personalInfo: PersonalInfo = {
  name: "Toshiki Sakuta",
  nameEn: "Toshiki Sakuta",
  summary: "Web Engineer",
};

/* ────────────────────
  資格情報
──────────────────── */
export const certifications: Certification[] = [
  {
    id: "az-900",
    name: "AZ-900：Microsoft Azure Fundamentals",
    date: "2023年1月",
  },
  {
    id: "pl-900",
    name: "PL-900：Power Platform Fundamentals",
    date: "2022年8月",
  },
  {
    id: "drivers-license",
    name: "普通自動車免許第一種",
    date: "2010年4月",
  },
];

/* ────────────────────
  スキルカテゴリ
──────────────────── */
export const skills: SkillCategory[] = [
  {
    category: "フロントエンド",
    items: ["React", "Next.js", "TailwindCSS", "HTML/CSS", "JavaScript/TypeScript"],
  },
  {
    category: "バックエンド",
    items: ["Node.js", "Express", "REST API"],
  },
  {
    category: "クラウド",
    items: ["Microsoft Azure", "AWS", "Azure Functions", "Azure Logic Apps"],
  },
  {
    category: "データベース",
    items: ["SQL", "Dataverse"],
  },
  {
    category: "ツール・その他",
    items: ["Git", "Power Platform", "Microsoft 365", "Dynamics 365", "Excel VBA"],
  },
  {
    category: "セキュリティ",
    items: ["Azure Security", "Defender for Cloud", "Sentinel", "ゼロトラストセキュリティ"],
  },
];

/* ────────────────────
  自己PR
──────────────────── */
export const selfPR = `
私は「人の期待を超える価値」を追求し、技術とホスピタリティの両面から貢献できるエンジニアを目指しています。

高校でC言語を学び、大学ではプロダクトデザインを専攻。カナダ留学とラグジュアリーホテルでの接客経験を通じて、多様性への理解と高品質な対応力を培いました。

キャリアのスタートは自動車部品メーカーのエンジニア。厳しい品質基準下での電装設計を経験後、不動産業界では営業未経験ながら全国トップ成績を達成。グローバルIT企業では Azure や Power Platform を活用した業務最適化や脅威分析・自動化に貢献し、高評価を獲得。

現在は Web 開発に注力し、Next.js、TypeScript など最新技術を活用。GitHub にてリポジトリを公開しています。
`;

/* ────────────────────
  ユーティリティ関数
──────────────────── */

/**
 * 指定カテゴリのスキルを取得
 */
export function getSkillsByCategory(category: string): string[] {
  return skills.find((s) => s.category === category)?.items ?? [];
}

/**
 * すべてのスキルをフラットに取得
 */
export function getAllSkills(): string[] {
  return skills.flatMap((s) => s.items);
}

/**
 * 資格を取得日で降順ソート
 */
export function getSortedCertificationsByDate(): Certification[] {
  return [...certifications].sort((a, b) => b.date.localeCompare(a.date));
}
