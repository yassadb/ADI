"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function CtaBannerSection() {
  // Define the more matte, sober green button style
  const greenButtonStyle = {
    background: "linear-gradient(to right, #065f46, #064e3b)", // More matte, sober forest green
    color: "white",
    borderRadius: "9999px",
    fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "none",
  }

  return (
    <section className="bg-gradient-to-r from-brand-blue via-sky-500 to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {/* Subtle pattern or abstract shapes */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="ctaPattern"
              patternUnits="userSpaceOnUse"
              width="60"
              height="60"
              patternTransform="scale(1) rotate(45)"
            >
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              <circle cx="40" cy="40" r="1" fill="currentColor" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaPattern)" />
        </svg>
      </div>

      <div className="relative container mx-auto max-w-4xl py-20 px-4 sm:px-6 lg:py-28 lg:px-8">
        <div className="text-center animate-fade-in-up">
          <MessageCircle className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">Prêt pour le digital ?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discutons de vos ambitions. Ensemble, transformons vos idées en réalité numérique percutante et durable pour
            le marché marocain.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 text-sm transition-all duration-300 transform hover:scale-105 group"
            style={greenButtonStyle}
          >
            Parlons de Votre Projet
            
          </Link>
        </div>
      </div>
    </section>
  )
}
// This section already has `animate-fade-in-up` on the main content block.
// Review if individual elements within it (icon, title, paragraph, button) could benefit from slight staggers if not already subtle enough.
// For now, the existing animation might be sufficient.
