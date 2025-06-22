"use client"

import { Award, Lightbulb, Handshake, ShieldCheck, Users, FocusIcon as FocusTarget } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Award,
    name: "Excellence",
    description: "Nous visons la perfection dans chaque détail, pour des livrables qui dépassent les attentes.",
  },
  {
    icon: Lightbulb,
    name: "Innovation",
    description: "Nous explorons constamment de nouvelles technologies pour offrir des solutions avant-gardistes.",
  },
  {
    icon: Handshake,
    name: "Partenariat",
    description: "Nous bâtissons des relations de confiance durables, fondées sur la collaboration et la transparence.",
  },
  {
    icon: ShieldCheck,
    name: "Intégrité",
    description: "L'honnêteté et l'éthique sont au cœur de toutes nos interactions et décisions professionnelles.",
  },
  {
    icon: Users,
    name: "Orientation Client",
    description: "Votre succès est notre priorité. Nous écoutons, comprenons et adaptons nos solutions à vos besoins.",
  },
  {
    icon: FocusTarget,
    name: "Rigueur & Précision",
    description:
      "Nous appliquons une méthodologie éprouvée et un suivi méticuleux pour garantir la réussite de vos projets.",
  },
]

const ValueCard = ({ value, delay }: { value: (typeof values)[0]; delay: number }) => {
  const anim = useScrollAnimation({ delay })
  return (
    <Card
      ref={anim.ref}
      className={cn(
        "flex flex-col items-center text-center bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 opacity-0",
        anim.animationClassName,
      )}
      style={anim.style}
    >
      <CardHeader className="items-center pt-8 pb-4">
        <div className="p-4 bg-brand-blue/10 rounded-full mb-4">
          <value.icon className="h-8 w-8 text-brand-blue" />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">{value.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-8">
        <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
      </CardContent>
    </Card>
  )
}

export default function ValuesSection() {
  const titleAnim = useScrollAnimation()
  const paragraphAnim = useScrollAnimation({ delay: 100 })

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={titleAnim.ref}
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4 opacity-0",
              titleAnim.animationClassName,
            )}
            style={titleAnim.style}
          >
            Les Valeurs Fondatrices de Notre Agence.
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn("text-lg text-muted-foreground opacity-0", paragraphAnim.animationClassName)}
            style={paragraphAnim.style}
          >
            Ces principes guident chacune de nos actions et collaborations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <ValueCard key={value.name} value={value} delay={(index + 1) * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
