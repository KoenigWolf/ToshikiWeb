// =====================================
// ホームページのメインコンポーネント
// =====================================
// このコンポーネントは、ポートフォリオサイトのトップページを構成する。
// セクションの一覧を定義し、動的にレンダリングすることで、
// メンテナンス性と拡張性を向上させる。

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
// - セクションの順序や内容を変更したい場合、この配列を編集する。
// - `id` はユニークな識別子として指定し、キーとして使用。
// - `component` はセクションのコンポーネントを指定。

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
