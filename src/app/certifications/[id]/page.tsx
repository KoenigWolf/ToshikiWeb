import { notFound } from "next/navigation";
import { certifications } from "@/lib/profile";
import { CertificationDetail } from "@/components/features/CertificationDetail";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import type { Certification } from "@/lib/profile";
import type { Metadata } from "next";

// =====================================
// 型定義
// =====================================
interface PageProps {
  params: {
    id: string;
  };
}

// =====================================
// 静的パスを生成
// =====================================
export async function generateStaticParams() {
  return certifications.map((cert: Certification) => ({ id: cert.id }));
}

// =====================================
// メタデータを動的に生成
// =====================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;
  const certification = certifications.find((cert: Certification) => cert.id === id);

  if (!certification) {
    return createMetadata({
      title: '資格詳細',
      description: '資格詳細ページ',
      noIndex: true
    });
  }

  return createMetadata({
    title: certification.name,
    description: `${certification.name}の取得詳細`,
    keywords: [certification.name, certification.issuer || '資格', '認定資格'],
  });
}

// =====================================
// 資格詳細ページ
// =====================================
export default function CertificationDetailPage({ params }: PageProps) {
  const { id } = params;
  const certification = certifications.find((cert: Certification) => cert.id === id);

  if (!certification) {
    notFound();
  }

  return <CertificationDetail certId={id} />;
} 