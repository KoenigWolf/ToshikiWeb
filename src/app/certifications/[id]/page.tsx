import { notFound } from "next/navigation";
import { certifications } from "@/lib/profile";
import { CertificationDetail } from "@/components/organisms/CertificationDetail";

// =====================================
// 静的パスを生成
// =====================================
export async function generateStaticParams() {
  return certifications.map((cert) => ({ id: cert.id }));
}

// =====================================
// 資格詳細ページ
// =====================================
interface PageProps {
  params: {
    id: string;
  };
}

export default function CertificationDetailPage({ params }: PageProps) {
  const { id } = params;
  const certification = certifications.find((cert) => cert.id === id);

  if (!certification) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <CertificationDetail certId={id} />
    </main>
  );
} 