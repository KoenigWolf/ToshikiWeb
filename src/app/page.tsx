import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <PortfolioSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
