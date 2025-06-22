"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ApproachCtaSection() {
  const sectionContentAnim = useScrollAnimation<HTMLDivElement>() // Default animationName is fade-in-up

  return (
    <section className="bg-gradient-to-r from-brand-blue via-sky-500 to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="approachCtaPattern"
              patternUnits="userSpaceOnUse"
              width="70"
              height="70"
              patternTransform="scale(1) rotate(30)"
            >
              <circle cx="15" cy="15" r="1.2" fill="currentColor" opacity="0.7" />
              <path d="M30 10 L50 30 L30 50 Z" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#approachCtaPattern)" />
        </svg>
      </div>
      <div className="relative container mx-auto max-w-3xl py-20 px-4 sm:px-6 lg:py-28 lg:px-8 text-center">
        <div
          ref={sectionContentAnim.ref}
          className={cn("opacity-0", sectionContentAnim.animationClassName)}
          style={sectionContentAnim.style}
        >
          <Sparkles className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Prêt à Démarrer Votre Projet avec une Équipe Structurée et à Votre Écoute ?
          </h3>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Notre méthodologie éprouvée est la garantie d'un projet mené avec succès, de la conception à la livraison.
            Contactez-nous pour concrétiser votre vision.
          </p>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-sm font-semibold transition-all duration-300 transform hover:scale-105 rounded-full"
            style={{
              background: "linear-gradient(to right, #065f46, #064e3b)",
              color: "white",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: "none",
            }}
          >
            Planifions Votre Réussite
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
