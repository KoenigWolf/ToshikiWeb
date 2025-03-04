// =====================================
// Homeページのメインコンポーネント
// =====================================
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 各セクションのコンポーネント
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";

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
