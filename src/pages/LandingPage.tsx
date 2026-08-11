import { CTASection } from "../components/landing/CTASection";
import { GameStats } from "../components/landing/GameStats";
import { Hero } from "../components/landing/Hero";
import { Marquee } from "../components/landing/Marquee";
import { PhilosophySection } from "../components/landing/PhilosophySection";
import { WhatIsMilTower } from "../components/landing/WhatIsMilTower";

export function LandingPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhatIsMilTower />
      <GameStats />
      <PhilosophySection />
      <CTASection />
    </>
  );
}
