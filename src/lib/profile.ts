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
};

// =====================================
// 取得資格リスト
// =====================================
// 各資格には以下の情報が含まれます：
// id: 資格の一意識別子
// name：資格名
// date: 取得日
// issuer: 発行機関（オプション）
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
// 各カテゴリには以下の情報が含まれます。
// category: カテゴリ名
// items: そのカテゴリに属するSkill項目の配列
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
export const selfPR = `私は「人の期待を超える価値」を追求し、技術とホスピタリティの両面から貢献できるエンジニアを目指しております。
学生時代、工業高校でC言語を学び、大学ではプロダクトデザインを専攻しクリエイティブな思考力を獲得。カナダ留学し、多様な文化背景を受け入れる柔軟性や新しい環境への適応力も身につけました。同時に、世界的に評価されるラグジュアリーホテルのサービススタッフとして従事し、「お客様の望みを先読みして提供する」ホスピタリティ精神を実践的に身につけました。高品質なサービスの現場で培った、相手の立場に立った気配りと迅速な行動力は、現在のエンジニア業務にも大きく生きています。
キャリアスタートは、自動車部品メーカーの派遣エンジニアとして始まり、中枢神経ともいえるワイヤーハーネス搭載設計・評価業務を担当し、世界的な自動車メーカーが定める厳しい品質基準を満たす製品開発に従事しました。
その後、不動産業界へ転身し、営業未経験ながらもエンジニアとして培ったデータ分析力を活用し、市場動向や顧客心理を見抜くことで全国トップの営業成績を達成。この経験で培った強靭な精神力と現場視点の課題解決力は、私の大きな財産となりました。
グローバル企業にて、クラウドインフラの構築や運用、Azure ADを用いたアクセス管理、Defenderによる脅威監視など、セキュリティ分野に従事しました。PowerShellやCLIを活用し、運用プロセスの自動化にも取り組み、お客様から 5 点満点中 4.7 以上の高評価を獲得。Power Platformを活用した業務プロセスの最適化やアプリ開発支援にも携わり、技術を活用して人々の仕事をより快適で効率的にする喜びを再認識しました。
現在は、最新技術への関心からWeb開発にも取り組んでいます。Next.js（React）・TypeScript・Supabase・Dockerなど最新の技術を取り入れ、フルスタック開発を積極的に行っています。GitHubにて75以上のリポジトリを制作し、実践的な開発スキルを身につけています。`;

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