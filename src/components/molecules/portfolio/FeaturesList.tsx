import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// =====================================
// 機能リストコンポーネント
// プロジェクトの機能や特徴をリスト表示
// Atomic Design: Molecule - 複数の要素を組み合わせたUI
// =====================================

export interface FeaturesListProps {
  /** 表示する機能リスト */
  features: string[];
  
  /** カードタイトル */
  title?: string;
  
  /** カード説明文 */
  description?: string;
  
  /** 追加のスタイルクラス */
  className?: string;
}

/**
 * 機能リスト - プロジェクトの機能一覧を表示するカード
 * @param props コンポーネントのプロパティ
 * @returns FeaturesListコンポーネント
 */
export function FeaturesList({ 
  features,
  title = "主な機能",
  description = "このプロジェクトの特徴",
  className = ""
}: FeaturesListProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
} 