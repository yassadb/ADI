import Header from "../header"
import Footer from "../footer"
import HeroSection from "../hero-section"
import ServicesOverviewSection from "../services-overview-section"
import WhyChooseUsSection from "../why-choose-us-section"
import CtaBannerSection from "../cta-banner-section"
import PortfolioScrollSection from "../portfolio-scroll-section"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Section 1: "Votre Vision" — Hero */}
        <HeroSection />
        {/* Section 2: "Notre Craft" — Services */}
        <ServicesOverviewSection />
        {/* Section 3: "Nos Créations" — Portfolio */}
        <PortfolioScrollSection />
        {/* Section 4: "Le Parcours" — Process Timeline */}
        <WhyChooseUsSection />
        {/* Section 5: "Construisons Ensemble" — CTA */}
        <CtaBannerSection />
      </main>
      <Footer />
    </div>
  )
}
