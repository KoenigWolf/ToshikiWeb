"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, User, Mail, MapPin, Globe } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/lib/profile";
import { getAllSkills } from "@/lib/profile";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

// 型定義 (Types)：ProfileInfoItem
// 基本情報カード内に表示する各項目の構造を定義
interface ProfileInfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// CareerTimelineItem：経歴タイムラインに表示する各項目の期間とタイトルを定義
interface CareerTimelineItem {
  period: string;
  title: string;
}

// ====================================
// 定数定義 (Constants)
// ====================================
// ANIMATION_VARIANTS
// モーションの初期状態、表示状態、及び遷移時間を一元管理
// 各コンポーネントで一貫したアニメーション効果を実現するために利用
const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// PROFILE_INFO_ITEMS：基本情報カードで表示する項目（アイコン、ラベル、値）の定義
const PROFILE_INFO_ITEMS: ProfileInfoItem[] = [
  {
    icon: <User className="w-5 h-5 text-gray-500" />,
    label: "名前",
    value: personalInfo.name,
  },
  {
    icon: <Mail className="w-5 h-5 text-gray-500" />,
    label: "メール",
    value: "creatorsoasis@outlook.com",
  },
  {
    icon: <MapPin className="w-5 h-5 text-gray-500" />,
    label: "所在地",
    value: "大阪市",
  },
];

// CAREER_TIMELINE：経歴タイムラインに表示する各項目の期間とタイトルの定義
const CAREER_TIMELINE: CareerTimelineItem[] = [
  { period: "2022", title: "Microsoft Azure Project" },
  { period: "2021", title: "Dynamics 365 Project" },
  { period: "2020", title: "Microsoft 365 Project" },
  { period: "2020", title: "Uber Project" },
  { period: "2019", title: "不動産仲介営業" },
  { period: "2019", title: "農業機械エンジニア" },
  { period: "2017", title: "自動車電装エンジニア" },
  { period: "2014", title: "The Ritz Carlton Staff" },
];

// ====================================
// サブコンポーネント (Sub Components)
// ====================================
/**
 * BackButton コンポーネント
 * - 「戻る」ボタンを表示し、クリックで指定セクション（#about）へ遷移
 * - ButtonコンポーネントとNext.jsのLinkで構成
 */
const BackButton = () => {
  return (
    <Link href="/#about" passHref>
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        戻る
      </Button>
    </Link>
  );
};

// ProfileHeader コンポーネント
const ProfileHeader = () => {
  return (
    <>
      <p className="mb-8 text-gray-600 dark:text-gray-400 font-noto-sans-jp">
        {personalInfo.name}のプロフィール
      </p>
    </>
  );
};

// ProfileInfoCard コンポーネント：基本情報をカード形式で表示
// 各情報項目はアイコン・ラベル・値の組み合わせで表現され、ループ処理で展開
const ProfileInfoCard = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-noto-sans-jp">基本情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {PROFILE_INFO_ITEMS.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}
            <span
              className={cn(
                "text-gray-700 dark:text-gray-300",
                "font-noto-sans-jp"
              )}
            >
              {label}：{value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

/**
 * SelfPRCard コンポーネント
 * - 自己PR文をカード形式で表示
 */
const SelfPRCard = () => {
  const prText = "エンジニアとして常に新しい技術に取り組み、問題解決を通じて成長を続けています。これまでのさまざまな業界での経験を活かし、幅広い視点からプロジェクトに貢献できることが強みです。";
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-noto-sans-jp">自己PR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 font-noto-sans-jp">
            {prText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * SkillsCard コンポーネント
 * - 保有スキルをカード形式で表示
 * - getAllSkills関数で取得したスキル一覧をバッジ形式で描画し、視覚的な一貫性を提供
 * - Tooltipを使用して各スキルのより詳細な情報を表示
 */
const SkillsCard = () => {
  const allSkills = getAllSkills();

  // スキルの説明（サンプル）
  const skillDescriptions: Record<string, string> = {
    "Next.js": "Reactベースのフルスタックフレームワーク。SSR/SSGに対応",
    "React": "UIコンポーネントを構築するためのJavaScriptライブラリ",
    "TypeScript": "静的型付けのJavaScriptスーパーセット",
    "TailwindCSS": "ユーティリティファーストのCSSフレームワーク",
    "Node.js": "サーバーサイドJavaScriptランタイム",
    "Docker": "コンテナ型の仮想化技術",
    "AWS": "クラウドコンピューティングサービス",
    "Azure": "Microsoftのクラウドプラットフォーム",
    "Git": "分散型バージョン管理システム",
    "GraphQL": "APIのためのクエリ言語",
    "MongoDB": "NoSQLドキュメント指向データベース",
    "PostgreSQL": "オープンソースリレーショナルデータベース",
    // その他のスキルの説明はデフォルトで表示
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-noto-sans-jp">保有スキル</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <Tooltip key={skill}>
                <TooltipTrigger asChild>
                  <Badge className="font-noto-sans-jp cursor-help">
                    {skill}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{skillDescriptions[skill] || `${skill}の実務経験あり`}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

/**
 * CareerTimelineCard コンポーネント
 * - 経歴概要をタイムライン形式でカード内に表示
 * - CAREER_TIMELINE配列をTimelineコンポーネント用に整形して渡し、
 *   各項目の期間とタイトルを分かりやすく表示
 */
const CareerTimelineCard = () => {
  // CAREER_TIMELINE の各項目を Timeline コンポーネントが利用できる形式に変換
  const timelineData = CAREER_TIMELINE.map(({ period, title }) => ({
    title: period,
    content: (
      <div className="space-y-4">
        <h3 className={cn("text-lg font-semibold", "font-noto-sans-jp")}>
          {title}
        </h3>
      </div>
    ),
  }));

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-noto-sans-jp">経歴概要</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline data={timelineData} />
      </CardContent>
    </Card>
  );
};

// ====================================
// メインコンポーネント (Main Component)
// ====================================
/**
 * AboutDetail コンポーネント
 * - プロフィール詳細情報の全体レイアウトを管理
 * - BackButton, ProfileHeader, 各種情報カードを組み合わせ、ページ全体の構成とアニメーションを適用
 */
export function AboutDetail() {
  return (
    <div
      className={cn(
        "container max-w-4xl",
        "px-4 py-20 mx-auto"
      )}
    >
      {/* ページ上部に戻るボタン */}
      <BackButton />

      {/* モーション効果を適用してコンテンツのフェードイン・スライドアップを実現 */}
      <motion.div
        initial={ANIMATION_VARIANTS.initial}
        animate={ANIMATION_VARIANTS.animate}
        transition={ANIMATION_VARIANTS.transition}
      >
        {/* セクションの見出しと基本情報 */}
        <ProfileHeader />
        <ProfileInfoCard />
        <SelfPRCard />
        <SkillsCard />
        <CareerTimelineCard />

        {/* ページ下部にトップページに戻るボタン */}
        <div className="mt-8 text-center">
          <Link href="/#about" passHref>
            <Button variant="outline">
              トップページに戻る
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
