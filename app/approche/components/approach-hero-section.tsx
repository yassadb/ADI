"use client"

import { Workflow } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ApproachHeroSection() {
  const badgeAnim = useScrollAnimation<HTMLDivElement>({ delay: 100 })
  const titleAnim = useScrollAnimation<HTMLHeadingElement>({ delay: 200 })
  const paragraphAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 300 })

  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-50 dark:opacity-30 pointer-events-none" />
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
            ref={badgeAnim.ref}
            className={cn(
              "inline-block px-4 py-1.5 mb-6 bg-accent/10 text-accent rounded-full text-sm font-medium opacity-0",
              badgeAnim.animationClassName,
            )}
            style={badgeAnim.style}
          >
            <Workflow className="inline-block h-4 w-4 mr-1.5" />
            Notre Méthodologie
          </div>
          <h1
            ref={titleAnim.ref}
            className={cn(
              "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Une Approche Structurée pour des <span className="text-brand-blue">Résultats Optimaux</span>.
          </h1>
          <p
            ref={paragraphAnim.ref}
            className={cn(
              "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0",
              paragraphAnim.animationClassName,
            )}
            style={paragraphAnim.style}
          >
            Chez Atlas Digital Impact, chaque projet digital est mené avec rigueur, transparence et une collaboration
            étroite. Nous suivons un processus éprouvé pour garantir la qualité et l'atteinte de vos objectifs
            spécifiques au Maroc.
          </p>
        </div>
      </div>
    </section>
  )
}
