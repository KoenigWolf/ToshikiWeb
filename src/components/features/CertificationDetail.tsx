// サーバーコンポーネントに変換
import { Calendar, Building } from "lucide-react";
import { DetailLayout } from "@/components/common/DetailLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications } from "@/lib/profile";
import type { Certification } from "@/lib/profile";

// =====================================
// 資格詳細表示コンポーネント
// =====================================
export interface CertificationDetailProps {
  certId: string;
}

export function CertificationDetail({ certId }: CertificationDetailProps) {
  // サーバーサイドでデータを直接取得
  const certification = certifications.find((cert: Certification) => cert.id === certId);

  if (!certification) {
    return (
      <DetailLayout backText="資格一覧に戻る" backPath="/#certifications">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-500 font-noto-sans-jp">
              資格が見つかりません
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-noto-sans-jp">
              指定された資格IDに対応する資格が見つかりませんでした。
            </p>
          </CardContent>
        </Card>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout 
      title={certification.name} 
      backText="資格一覧に戻る" 
      backPath="/#certifications"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-noto-sans-jp">資格情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 資格名 */}
            <div>
              <h3 className="mb-2 text-lg font-semibold font-noto-sans-jp">公式名称</h3>
              <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                {certification.name}
              </p>
            </div>

            {/* 取得日 */}
            <div>
              <h3 className="flex items-center gap-2 mb-2 text-lg font-semibold font-noto-sans-jp">
                <Calendar className="w-5 h-5" />
                取得日
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                {certification.date}
              </p>
            </div>

            {/* 発行機関 */}
            {certification.issuer && (
              <div>
                <h3 className="flex items-center gap-2 mb-2 text-lg font-semibold font-noto-sans-jp">
                  <Building className="w-5 h-5" />
                  発行機関
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                  {certification.issuer}
                </p>
              </div>
            )}

            {/* 説明 */}
            {certification.description && (
              <div>
                <h3 className="mb-2 text-lg font-semibold font-noto-sans-jp">説明</h3>
                <p className="text-gray-700 dark:text-gray-300 font-noto-sans-jp">
                  {certification.description}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DetailLayout>
  );
} 