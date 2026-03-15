"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GeoPatternBackground } from "@/components/ui/geo-pattern"
import { ScrollSection } from "@/components/ui/scroll-section"

export default function CtaBannerSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-deep via-indigo to-indigo-deep text-white">
      {/* Geometric pattern overlay */}
      <GeoPatternBackground variant="rosette" opacity={0.06} />

      <div className="relative container mx-auto max-w-4xl py-20 px-4 sm:px-6 lg:py-28 lg:px-8">
        <ScrollSection animation="scale">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              <span className="text-amber-light">Construisons</span> Ensemble
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Expertise digitale locale en Belgique, impact au Maroc. Discutons de vos ambitions et
              transformons vos idées en réalité numérique percutante.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold rounded-full bg-amber hover:bg-amber-deep text-white shadow-lg shadow-amber/30 transition-all duration-300 hover:scale-105"
              >
                Démarrer une Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Voir nos services
              </Link>
            </div>
          </div>
        </ScrollSection>
      </div>
    </section>
  )
}
