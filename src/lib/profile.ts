// =====================================
// 個人情報、資格、Skill、自己PRを管理するファイル
// =====================================
// このファイルは、プロフィールセクションに表示される個人情報、取得資格、
// Skillセット、自己PRなどの情報を定義します。

import type { PersonalInfo, Certification, SkillCategory } from "./types";

// =====================================
// 個人情報
// =====================================
// 名前、英語名、自己紹介文などの基本的な個人情報を定義します。
export const personalInfo: PersonalInfo = {
  name: "Toshiki Sakuta",
  nameEn: "Toshiki Sakuta",
  summary: "クラウド技術、業務自動化、インフラ運用、Web開発を幅広く経験し、技術とビジネスの両面で価値を創出。Microsoft Azure を活用した設計・運用・自動化を通じて企業の生産性向上に貢献。PM 経験を活かし、業務課題を分析し最適な技術ソリューションを提案・実装。Microsoft 365・Dynamics 365 導入支援、セキュリティ対策、データ分析基盤構築など、多様なプロジェクトに携わる。",
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
// 自己PR文
// =====================================
// 自己PRとして表示されるテキスト。経験、強み、価値観などを含みます。
export const selfPR = `私は、クラウド技術・業務自動化・インフラ運用の知見を有しています。Microsoft Azure や Power Platform を活用したシステム設計・自動化を得意とし、業務効率化やデータ活用基盤の最適化を実現してきました。業務フローの自動化により、手作業を大幅に削減し、データの可視化と意思決定のスピードを向上させるなど、技術を駆使して現場の課題解決に取り組んできました。
さらに、接客業での経験を通じて、人の動きやニーズを深く理解する力を培いました。この経験により、単なる数値分析にとどまらず、実際のユーザー体験や業務フローの改善につながるデータ活用を意識できることが強みです。データを活用しながら、現場に寄り添った最適なソリューションを提供する視点を持っています。
技術力だけでなく、ビジネス視点を持ち、顧客や現場の課題解決に貢献できるエンジニアを目指しています。新しい挑戦や学びの機会を常に探しており、チームでの協働を通じて成長していきたいと考えています。`;

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