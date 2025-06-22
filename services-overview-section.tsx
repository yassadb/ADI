"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MonitorPlay, ShoppingCart, AppWindow, Paintbrush } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: MonitorPlay,
    title: "Sites Vitrines Modernes",
    description: "Établissez une présence en ligne percutante qui inspire confiance et professionnalisme.",
    href: "/realisations?category=Site+Vitrine#gallery",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stratégique",
    description: "Transformez les clics en clients avec des plateformes de vente en ligne optimisées et intuitives.",
    href: "/realisations?category=E-commerce#gallery",
  },
  {
    icon: AppWindow,
    title: "Applications Web Sur Mesure",
    description:
      "Digitalisez vos opérations et offrez des expériences utilisateur fluides avec des solutions web robustes.",
    href: "/realisations?category=Application+Web#gallery",
  },
  {
    icon: Paintbrush,
    title: "Branding & Identité Visuelle",
    description: "Créez une marque mémorable qui résonne avec votre audience et se démarque de la concurrence.",
    href: "/realisations?category=Branding#gallery",
  },
]

export default function ServicesOverviewSection() {
  const titleAnim = useScrollAnimation<HTMLHeadingElement>({ duration: 600 })
  const paragraphAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 100, duration: 600 })
  const buttonContainerAnim = useScrollAnimation<HTMLDivElement>({ delay: 500, duration: 600 })

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
            Des Solutions Digitales Complètes pour Votre Succès.
          </h2>
          <p
            ref={paragraphAnim.ref}
            className={cn("text-lg text-muted-foreground opacity-0", paragraphAnim.animationClassName)}
            style={paragraphAnim.style}
          >
            De la conception à la réalisation, nous couvrons tous les aspects de votre transformation numérique.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => {
            return <ServiceCard key={service.title} service={service} index={index} />
          })}
        </div>
        <div
          ref={buttonContainerAnim.ref}
          className={cn("text-center mt-16 opacity-0", buttonContainerAnim.animationClassName)}
          style={buttonContainerAnim.style}
        >
          <Button
            asChild
            size="lg"
            className="bg-brand-blue hover:bg-brand-blue/90 text-brand-blue-foreground rounded-full px-10"
          >
            <Link href="/services">Voir tous nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const cardAnim = useScrollAnimation<HTMLDivElement>({ delay: 150 * index, duration: 500 })
  return (
    <div
      key={service.title}
      ref={cardAnim.ref}
      className={cn("opacity-0", cardAnim.animationClassName)}
      style={cardAnim.style}
    >
      <Card
        className={`flex flex-col bg-card border-border/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full`}
      >
        <CardHeader className="items-start p-6">
          <div className="p-3 rounded-lg bg-brand-blue/10 text-brand-blue mb-4">
            <service.icon className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-6 pt-0">
          <p className="text-sm text-muted-foreground mb-6 flex-grow">{service.description}</p>
          <Button
            asChild
            variant="ghost"
            className="!text-brand-blue hover:!text-brand-blue/80 p-0 h-auto self-start group font-medium"
          >
            <Link href={service.href}>En savoir plus</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
