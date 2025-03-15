import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// FeaturesListProps: プロジェクトの機能一覧を表示するためのプロパティ
export interface FeaturesListProps {
  features: string[]; // 表示する機能の配列
  title?: string; // カードのタイトル (デフォルト: "主な機能")
  description?: string; // カードの説明文 (オプション)
  className?: string; // 追加のスタイルクラス (オプション)
}

// FeaturesListコンポーネント: プロジェクトの機能一覧をカード形式で表示
export function FeaturesList({
  features,
  title = "主な機能",
  description,
  className = "",
}: FeaturesListProps) {
  // featuresが空の場合は何も表示しない
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          // 説明文がある場合はCardDescriptionで表示
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <span className="mr-2 text-primary">•</span> {/* リストアイテムの先頭にアイコンを表示 */}
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
