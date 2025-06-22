"use client"

import Header from "../../header"
import Footer from "../../footer"
import AgencyHeroSection from "./components/agency-hero-section"
import MissionSection from "./components/mission-section"
import ValuesSection from "./components/values-section"
import TeamSection from "./components/team-section"
import MoroccoCommitmentSection from "./components/morocco-commitment-section"
import CtaBannerSection from "@/cta-banner-section" // Using the global CTA banner

export default function AgencyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <AgencyHeroSection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
        <MoroccoCommitmentSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </div>
  )
}
