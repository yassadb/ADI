"use client" // Keep this if any child component needs it, or for potential future client-side interactions

import Header from "../header"
import Footer from "../footer"
import HeroSection from "../hero-section"
import IntroSection from "../intro-section"
import ServicesOverviewSection from "../services-overview-section"
import WhyChooseUsSection from "../why-choose-us-section"
import CtaBannerSection from "../cta-banner-section"
import PortfolioScrollSection from "../portfolio-scroll-section"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PortfolioScrollSection />
        <ServicesOverviewSection />
        <WhyChooseUsSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </div>
  )
}
