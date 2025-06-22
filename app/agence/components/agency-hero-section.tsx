"use client"

import { Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function AgencyHeroSection() {
  const badgeAnim = useScrollAnimation<HTMLDivElement>({ delay: 100 })
  const titleAnim = useScrollAnimation<HTMLHeadingElement>({ delay: 200 })
  const paragraphAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 300 })

  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Unified Background */}
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
            ref={badgeAnim.ref}
            className={cn(
              "inline-block px-4 py-1.5 mb-6 bg-accent/10 text-accent rounded-full text-sm font-medium opacity-0",
              badgeAnim.animationClassName,
            )}
            style={badgeAnim.style}
          >
            <Zap className="inline-block h-4 w-4 mr-1.5" />
            Notre Essence
          </div>
          <h1
            ref={titleAnim.ref}
            className={cn(
              "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            L'Alliance de l'Expertise et de la <span className="text-brand-blue">Passion Digitale</span>.
          </h1>
          <p
            ref={paragraphAnim.ref}
            className={cn(
              "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0",
              paragraphAnim.animationClassName,
            )}
            style={paragraphAnim.style}
          >
            Découvrez l'histoire, la mission et les valeurs qui animent Atlas Digital Impact, une agence basée à
            Bruxelles, résolument tournée vers l'innovation et le succès des entreprises marocaines.
          </p>
        </div>
      </div>
    </section>
  )
}
