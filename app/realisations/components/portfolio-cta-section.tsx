"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function PortfolioCtaSection() {
  const sectionAnim = useScrollAnimation<HTMLElement>({ animationName: "animate-fade-in", duration: 700 })
  const contentAnim = useScrollAnimation<HTMLDivElement>({
    animationName: "animate-fade-in-up",
    delay: 200,
    duration: 500,
  })
  const buttonAnim = useScrollAnimation<HTMLAnchorElement>({
    animationName: "animate-fade-in-up",
    delay: 400,
    duration: 500,
  })

  // Same matte, sober green button style
  const greenButtonStyle = {
    background: "linear-gradient(to right, #065f46, #064e3b)", // More matte, sober forest green
    color: "white",
    borderRadius: "9999px",
    fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "none",
  }

  return (
    <section
      ref={sectionAnim.ref}
      className={cn(
        "bg-gradient-to-r from-brand-blue via-sky-500 to-blue-600 text-white relative overflow-hidden opacity-0",
        sectionAnim.animationClassName,
      )}
      style={sectionAnim.style}
    >
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="portfolioCtaPattern"
              patternUnits="userSpaceOnUse"
              width="70"
              height="70"
              patternTransform="scale(1) rotate(30)"
            >
              <circle cx="15" cy="15" r="1.2" fill="currentColor" opacity="0.7" />
              <path d="M30 10 L50 30 L30 50 Z" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolioCtaPattern)" />
        </svg>
      </div>
      <div
        ref={contentAnim.ref}
        className={cn(
          "relative container mx-auto max-w-3xl py-20 px-4 sm:px-6 lg:py-28 lg:px-8 text-center opacity-0",
          contentAnim.animationClassName,
        )}
        style={contentAnim.style}
      >
        <div>
          <MessageCircle className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Vous Aimez ce Que Vous Voyez ? <br className="sm:hidden" />
            Imaginez ce Que Nous Pouvons Faire pour Vous !
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Chaque projet est une nouvelle aventure. Discutons de la vôtre et créons ensemble une solution digitale qui
            vous ressemble et qui performe.
          </p>
          <Link
            ref={buttonAnim.ref}
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center px-10 py-4 text-base transition-all duration-300 transform hover:scale-105 opacity-0 group",
              buttonAnim.animationClassName,
            )}
            style={{ ...greenButtonStyle, ...buttonAnim.style }}
          >
            Discutons de Votre Projet Unique
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
