import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { ProblemSection } from "@/components/problem/problem-section";
import { InstallationSection } from "@/components/installation/installation-section";
import { IntroOverlay } from "@/components/intro/intro-overlay";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian-900 text-white">
      <IntroOverlay />
      <Navbar />
      
      <HeroSection />
      
      <ProblemSection />

      <InstallationSection />
    </main>
  );
}
