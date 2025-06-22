"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function TeamSection() {
  const titleAnim = useScrollAnimation()
  const paragraphAnim = useScrollAnimation({ delay: 100 })

  return (
    <section className="relative bg-secondary/30 py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <Image
          src="/images/team-background-modern-dark.png"
          alt="Arrière-plan abstrait pour la section équipe"
          fill
          objectFit="cover"
          className="pointer-events-none"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-secondary/30 to-transparent opacity-70 dark:opacity-50"></div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            ref={titleAnim.ref}
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Une Équipe d'Experts <span className="text-brand-blue">Passionnés</span> à Votre Service.
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn(
              "text-lg leading-relaxed text-muted-foreground mb-8 opacity-0",
              paragraphAnim.animationClassName,
            )}
            style={paragraphAnim.style}
          >
            Atlas Digital Impact s'appuie sur une synergie de talents – designers créatifs, développeurs ingénieux, et
            stratèges visionnaires. Basés en Belgique, nous cultivons une expertise pointue et un engagement profond,
            avec une écoute active et une présence dédiée aux besoins spécifiques du marché marocain.
          </p>
        </div>
      </div>
    </section>
  )
}
