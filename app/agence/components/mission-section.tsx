"use client"

import { Target } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function MissionSection() {
  const iconAnim = useScrollAnimation()
  const titleAnim = useScrollAnimation({ delay: 100 })
  const paragraphAnim = useScrollAnimation({ delay: 200 })

  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
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
            <Target className="h-10 w-10 text-brand-blue" />
          </div>
          <h2
            ref={titleAnim.ref}
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Notre Mission : Catalyser Votre <span className="text-brand-blue">Transformation Digitale</span>.
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn("text-lg leading-relaxed text-muted-foreground opacity-0", paragraphAnim.animationClassName)}
            style={paragraphAnim.style}
          >
            Chez <strong className="text-foreground">Atlas Digital Impact</strong>, notre vocation est d'habiliter les
            entreprises marocaines, quelle que soit leur taille, à exploiter la pleine puissance du digital. Nous visons
            à concrétiser vos ambitions de croissance, à amplifier votre visibilité et à optimiser votre efficacité
            opérationnelle grâce à des solutions web innovantes, performantes et conçues sur mesure.
          </p>
        </div>
      </div>
    </section>
  )
}
