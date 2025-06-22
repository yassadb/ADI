"use client"

import Header from "../../header"
import Footer from "../../footer"
import ApproachHeroSection from "./components/approach-hero-section"
import ProcessStepsSection from "./components/process-steps-section"
import QualityCommitmentsSection from "./components/quality-commitments-section"
import ClientExpectationsSection from "./components/client-expectations-section"
import ApproachCtaSection from "./components/approach-cta-section"

export default function ApproachPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ApproachHeroSection />
        <ProcessStepsSection />
        <QualityCommitmentsSection />
        <ClientExpectationsSection />
        <ApproachCtaSection />
      </main>
      <Footer />
    </div>
  )
}
