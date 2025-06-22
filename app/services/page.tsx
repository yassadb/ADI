"use client"

import Link from "next/link"
import Header from "../../header"
import Footer from "../../footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonitorPlay, ShoppingCart, AppWindow, Paintbrush, BarChart3 } from "lucide-react"
import ServicesHeroSection from "./components/services-hero-section"
import CtaBannerSection from "@/cta-banner-section"

const availableServices = [
  {
    icon: MonitorPlay,
    title: "Sites Vitrines Modernes et Performants",
    description:
      "Créez une présence en ligne professionnelle et impactante, optimisée pour convertir vos visiteurs en clients.",
    href: "/services/sites-vitrines",
    ctaText: "Découvrir les sites vitrines",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stratégique",
    description: "Lancez votre boutique en ligne optimisée pour le marché marocain et maximisez vos ventes.",
    href: "/realisations?category=E-commerce#gallery",
    ctaText: "Voir nos réalisations E-commerce",
  },
  {
    icon: AppWindow,
    title: "Applications Web Intuitives",
    description: "Digitalisez vos processus et offrez des outils sur mesure à vos clients ou à vos équipes.",
    href: "/realisations?category=Application+Web#gallery",
    ctaText: "Découvrir nos applications",
  },
  {
    icon: Paintbrush,
    title: "Branding & Identité Visuelle",
    description: "Créez une marque mémorable qui résonne avec votre audience et se démarque de la concurrence.",
    href: "/realisations?category=Branding#gallery",
    ctaText: "Explorer nos créations",
  },
  {
    icon: BarChart3,
    title: "Stratégie Digitale & SEO",
    description: "Augmentez votre visibilité et atteignez vos objectifs grâce à des stratégies data-driven.",
    href: "/contact?service=strategie",
    ctaText: "Discuter de stratégie",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ServicesHeroSection />

        <section className="bg-secondary/30 py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {availableServices.map((service, index) => (
                <Card
                  key={service.title}
                  className="flex flex-col bg-card border-border/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="items-start p-6">
                    <div className="p-3 rounded-lg bg-brand-blue/10 text-brand-blue mb-4">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col p-6 pt-0">
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">{service.description}</p>
                    <Button
                      asChild
                      variant="ghost"
                      className="text-brand-blue hover:text-brand-blue/80 p-0 h-auto self-start group"
                    >
                      <Link href={service.href}>{service.ctaText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <CtaBannerSection />
      </main>
      <Footer />
    </div>
  )
}
