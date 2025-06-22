"use client"

import { Globe, Lightbulb, Award, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const differentiators = [
  {
    icon: Globe,
    title: "Vision Globale, Expertise Locale",
    description:
      "Nous combinons les meilleures pratiques internationales avec une compréhension fine du marché marocain pour des stratégies percutantes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Continue",
    description:
      "À la pointe des dernières tendances et technologies, nous concevons des solutions digitales avant-gardistes et sur mesure.",
  },
  {
    icon: Award,
    title: "Excellence & Qualité",
    description:
      "Notre engagement est de livrer des projets d'une qualité irréprochable, axés sur des résultats concrets et mesurables.",
  },
  {
    icon: Users,
    title: "Partenariat de Confiance",
    description:
      "Plus qu'un prestataire, nous sommes votre partenaire dédié, offrant un accompagnement personnalisé et une communication transparente.",
  },
]

export default function WhyChooseUsSection() {
  const titleAnim = useScrollAnimation<HTMLHeadingElement>({ duration: 600 })
  const paragraphAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 100, duration: 600 })
  const itemAnims = differentiators.map((_, index) =>
    useScrollAnimation<HTMLDivElement>({ delay: 200 + index * 150, duration: 500 }),
  )

  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={titleAnim.ref}
            className={cn(
              "text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Pourquoi Choisir <span className="text-brand-blue">Atlas Digital Impact</span> ?
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn("text-lg text-muted-foreground opacity-0", paragraphAnim.animationClassName)}
            style={paragraphAnim.style}
          >
            Nous ne sommes pas une agence comme les autres. Découvrez ce qui fait notre force.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {differentiators.map((item, index) => {
            const itemAnim = itemAnims[index]
            return (
              <div
                key={item.title}
                ref={itemAnim.ref}
                className={cn(
                  "flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 opacity-0",
                  itemAnim.animationClassName,
                )}
                style={itemAnim.style}
              >
                <div className="p-4 bg-brand-blue/10 rounded-full mb-6">
                  <item.icon className="h-10 w-10 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
