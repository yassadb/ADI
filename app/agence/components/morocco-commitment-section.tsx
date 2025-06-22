"use client"

import { HeartHandshake } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function MoroccoCommitmentSection() {
  const iconAnim = useScrollAnimation()
  const titleAnim = useScrollAnimation({ delay: 100 })
  const paragraphAnim = useScrollAnimation({ delay: 200 })

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            ref={iconAnim.ref}
            className={cn(
              "mb-6 inline-flex items-center justify-center p-3 bg-brand-blue/10 rounded-full opacity-0",
              iconAnim.animationClassName,
            )}
            style={iconAnim.style}
          >
            <HeartHandshake className="h-10 w-10 text-brand-blue" />
          </div>
          <h2
            ref={titleAnim.ref}
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Notre Engagement Spécifique pour le <span className="text-brand-blue">Maroc</span>.
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn("text-lg leading-relaxed text-muted-foreground opacity-0", paragraphAnim.animationClassName)}
            style={paragraphAnim.style}
          >
            Nous croyons ardemment au dynamisme et au potentiel exceptionnel du marché marocain. C'est pourquoi{" "}
            <strong className="text-foreground">Atlas Digital Impact</strong> s'engage à fournir des solutions web
            parfaitement alignées sur les réalités locales. Nous nous engageons à cultiver des collaborations
            fructueuses et à contribuer activement à l'essor de l'écosystème digital marocain, en apportant une valeur
            ajoutée tangible à chaque projet.
          </p>
        </div>
      </div>
    </section>
  )
}
