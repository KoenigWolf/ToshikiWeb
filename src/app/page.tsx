// =====================================
// Homeページのメインコンポーネント
// =====================================
import { Header } from "@/components/organisms/Header";
import Footer from "@/components/Footer";

// 各セクションのコンポーネント
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/organisms/SkillsSection";
import { CertificationsSection } from "@/components/organisms/CertificationsSection";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { AboutSection } from "@/components/organisms/AboutSection";

// =====================================
// セクションのリスト
// =====================================
const sections = [
  { id: "hero", component: HeroSection },
  { id: "experience", component: ExperienceSection },
  { id: "skills", component: SkillsSection },
  { id: "certifications", component: CertificationsSection },
  { id: "portfolio", component: PortfolioSection },
  { id: "about", component: AboutSection },
];

export default function Home() {
  return (
    <main>
      <Header />
      {/* セクションを動的にレンダリング */}
      {sections.map(({ id, component: SectionComponent }) => (
        <SectionComponent key={id} />
      ))}
      <Footer />
    </main>
  );
}
