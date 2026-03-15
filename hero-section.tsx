"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { KineticText } from "@/components/ui/kinetic-text"
import { GeoPatternBackground } from "@/components/ui/geo-pattern"
import { ScrollSection } from "@/components/ui/scroll-section"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Geometric pattern background */}
      <GeoPatternBackground variant="rosette" opacity={0.04} />

      {/* Subtle warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber/5 via-transparent to-indigo/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center py-20 md:py-32">
          {/* Badge */}
          <ScrollSection animation="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-amber/10 text-amber rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Expertise Belgique × Impact Maroc
            </div>
          </ScrollSection>

          {/* Main headline */}
          <ScrollSection animation="fade-up" delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              Façonnez votre avenir digital
            </h1>
          </ScrollSection>

          {/* Kinetic cycling text */}
          <ScrollSection animation="fade-up" delay={0.2}>
            <div className="mb-8">
              <KineticText
                texts={[
                  "Sites Web d'Exception",
                  "E-commerce Performant",
                  "Applications Sur Mesure",
                  "Branding Mémorable",
                ]}
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber to-amber-deep"
                interval={3500}
              />
            </div>
          </ScrollSection>

          {/* Subheadline */}
          <ScrollSection animation="fade-up" delay={0.3}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Nous façonnons le digital avec la précision d'un artisan. Expertise locale en Belgique,
              impact au Maroc.
            </p>
          </ScrollSection>

          {/* CTAs */}
          <ScrollSection animation="fade-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full bg-amber hover:bg-amber-deep text-white shadow-lg shadow-amber/20 transition-all duration-300 hover:scale-105"
              >
                Configurez votre projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/realisations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full border-2 border-indigo text-indigo hover:bg-indigo hover:text-white transition-all duration-300 hover:scale-105"
              >
                Découvrir nos créations
              </Link>
            </div>
          </ScrollSection>

          {/* Trust indicators */}
          <ScrollSection animation="fade-up" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              {["Design Artisanal", "Stratégie Axée Résultats", "Technologie de Pointe"].map((item) => (
                <div key={item} className="flex items-center text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-amber mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollSection>
        </div>
      </div>
    </section>
  )
}
