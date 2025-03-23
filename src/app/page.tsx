// Homeページのメインコンポーネント（改修版）
import { Suspense } from 'react';
import { Header } from '@/components/common/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/common/Footer';
import { getPortfolioItems } from "@/lib/server/portfolio";

// 優先度の高いセクション群（固定部分）
const baseSections = [
  { id: 'hero', Component: HeroSection, priority: true },
  { id: 'experience', Component: ExperienceSection, priority: false },
  { id: 'skills', Component: SkillsSection, priority: false },
  { id: 'certifications', Component: CertificationsSection, priority: false },
  { id: 'about', Component: AboutSection, priority: false },
];

// セクションラッパー：各セクションの遅延読み込みをサポート
const SectionWrapper = ({
  id,
  children,
  priority = false,
}: {
  id: string;
  children: React.ReactNode;
  priority?: boolean;
}) => (
  <section id={id} className="section-container">
    {priority ? (
      children
    ) : (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        {children}
      </Suspense>
    )}
  </section>
);

export default async function Home() {
  // ポートフォリオデータを取得
  const portfolioItems = await getPortfolioItems();

  // 既存のセクションに、ポートフォリオとコンタクトを追加
  const sections = [
    ...baseSections,
    {
      id: 'portfolio',
      // PortfolioSection に取得したデータを props 経由で渡す
      Component: () => <PortfolioSection items={portfolioItems} />,
      priority: false,
    },
    { id: 'contact', Component: ContactSection, priority: false },
    { id: 'footer', Component: Footer, priority: false },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* 各セクションを順次レンダリング */}
      {sections.map(({ id, Component, priority }) => (
        <SectionWrapper key={id} id={id} priority={priority}>
          <Component />
        </SectionWrapper>
      ))}
    </main>
  );
}
