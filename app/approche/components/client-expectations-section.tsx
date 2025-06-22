"use client"

import { Handshake } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ClientExpectationsSection() {
  const iconAnim = useScrollAnimation<HTMLDivElement>({ animationName: "fade-in" }) // Explicitly using fade-in
  const titleAnim = useScrollAnimation<HTMLHeadingElement>({ delay: 100 })
  const paragraphAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 200 })

  return (
    <section className="bg-brand-blue/5 py-20 sm:py-28">
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
            <Handshake className="h-10 w-10 text-brand-blue" />
          </div>
          <h2
            ref={titleAnim.ref}
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Pour une Collaboration <span className="text-brand-blue">Fructueuse</span>.
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn("text-lg leading-relaxed text-muted-foreground opacity-0", paragraphAnim.animationClassName)}
            style={paragraphAnim.style}
          >
            Votre implication active est un pilier essentiel de la réussite de nos projets communs. Pour garantir des
            résultats optimaux, nous valorisons une communication ouverte et réactive, des retours constructifs partagés
            dans les délais impartis, ainsi que la fourniture diligente des informations et contenus nécessaires au bon
            déroulement de chaque étape. Ensemble, nous pouvons atteindre et dépasser vos objectifs.
          </p>
        </div>
      </div>
    </section>
  )
}
