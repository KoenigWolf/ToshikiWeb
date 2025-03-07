// =====================================
// Homeページのメインコンポーネント
// =====================================
import { HeroSection } from '@/components/organisms/HeroSection';
import { ExperienceSection } from '@/components/organisms/ExperienceSection';
import { SkillsSection } from '@/components/organisms/SkillsSection';
import { CertificationsSection } from '@/components/organisms/CertificationsSection';
import { PortfolioSection } from '@/components/organisms/PortfolioSection';
import { AboutSection } from '@/components/organisms/AboutSection';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { SplashCursor } from '@/components/ui/splash-cursor';

// =====================================
// セクションのリスト
// =====================================
const sections = [
  { id: 'hero', Component: HeroSection },
  { id: 'experience', Component: ExperienceSection },
  { id: 'skills', Component: SkillsSection },
  { id: 'certifications', Component: CertificationsSection },
  { id: 'portfolio', Component: PortfolioSection },
  { id: 'about', Component: AboutSection },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <SplashCursor 
        SPLAT_RADIUS={0.25}
        COLOR_UPDATE_SPEED={15}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
      />
      <Header />
      {/* セクションを動的にレンダリング */}
      {sections.map(({ id, Component }) => (
        <Component key={id} />
      ))}
      <Footer />
    </main>
  );
}
