"use client"

import { Layers } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function ServicesHeroSection() {
  const animBadge = useScrollAnimation({ delay: 100, animationName: "fade-in" })
  const animTitle = useScrollAnimation({ delay: 200, animationName: "fade-in-up" })
  const animText = useScrollAnimation({ delay: 300, animationName: "fade-in-up" })

  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Restored Backgrounds */}
      <div className="absolute inset-0 bg-hero-gradient opacity-30 dark:opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 0.5px, transparent 0.5px), linear-gradient(to right, hsl(var(--foreground)) 0.5px, hsl(var(--background)) 0.5px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={animBadge.ref}
            className={cn(
              "inline-block px-4 py-1.5 mb-6 bg-accent/10 text-accent rounded-full text-sm font-medium opacity-0",
              animBadge.animationClassName,
            )}
            style={animBadge.style}
          >
            <Layers className="inline-block h-4 w-4 mr-1.5" />
            Nos Solutions
          </div>
          <h1
            ref={animTitle.ref}
            className={cn(
              "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 opacity-0",
              animTitle.animationClassName,
            )}
            style={animTitle.style}
          >
            Des Services Digitaux <span className="text-brand-blue">Conçus pour le Maroc</span>.
          </h1>
          <p
            ref={animText.ref}
            className={cn(
              "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0",
              animText.animationClassName,
            )}
            style={animText.style}
          >
            Chez Atlas Digital Impact, nous offrons une gamme complète de solutions digitales conçues pour propulser
            votre entreprise. Découvrez comment nous pouvons vous aider à atteindre et dépasser vos objectifs.
          </p>
        </div>
      </div>
    </section>
  )
}
