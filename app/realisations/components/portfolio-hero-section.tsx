"use client"

import { GalleryVertical } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function PortfolioHeroSection() {
  const animBadge = useScrollAnimation<HTMLDivElement>({ delay: 100, animationName: "fade-in" })
  const animTitle = useScrollAnimation<HTMLHeadingElement>({ delay: 200, animationName: "fade-in-up" })
  const animText = useScrollAnimation<HTMLParagraphElement>({ delay: 300, animationName: "fade-in-up" })

  return (
    <section id="gallery" className="relative bg-background text-foreground py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Restored Backgrounds */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/modern-abstract-blue.png')" }}
      />
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground)) 1px, hsl(var(--background)) 1px)",
          backgroundSize: "40px 40px",
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
            <GalleryVertical className="inline-block h-4 w-4 mr-1.5" />
            Notre Savoir-Faire
          </div>
          <h1
            ref={animTitle.ref}
            className={cn(
              "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 opacity-0",
              animTitle.animationClassName,
            )}
            style={animTitle.style}
          >
            Découvrez la Qualité Atlas Digital Impact <span className="text-brand-blue">en Action</span>.
          </h1>
          <p
            ref={animText.ref}
            className={cn(
              "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0",
              animText.animationClassName,
            )}
            style={animText.style}
          >
            Explorez une sélection de nos projets et concepts qui illustrent notre expertise en création de sites web
            modernes, performants et adaptés aux besoins des entreprises marocaines.
          </p>
        </div>
      </div>
    </section>
  )
}
