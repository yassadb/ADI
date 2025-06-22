"use client"

import Header from "../../header"
import Footer from "../../footer"
import PortfolioHeroSection from "./components/portfolio-hero-section"
import PortfolioGalleryWrapper from "./components/portfolio-gallery-wrapper"
import PortfolioCtaSection from "./components/portfolio-cta-section"

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <PortfolioHeroSection />
        <PortfolioGalleryWrapper />
        <PortfolioCtaSection />
      </main>
      <Footer />
    </div>
  )
}
