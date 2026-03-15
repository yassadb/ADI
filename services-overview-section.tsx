"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MonitorPlay, ShoppingCart, AppWindow, Paintbrush } from "lucide-react"
import { CraftCard } from "@/components/ui/craft-card"
import { ScrollSection } from "@/components/ui/scroll-section"

const services = [
  {
    icon: MonitorPlay,
    title: "Sites Vitrines Modernes",
    description:
      "Établissez une présence en ligne percutante qui inspire confiance et professionnalisme, pour les marchés belge et marocain.",
    href: "/realisations?category=Site+Vitrine#gallery",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stratégique",
    description:
      "Transformez les clics en clients avec des plateformes de vente en ligne optimisées et intuitives.",
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
    description:
      "Créez une marque mémorable qui résonne avec votre audience et se démarque de la concurrence.",
    href: "/realisations?category=Branding#gallery",
  },
]

export default function ServicesOverviewSection() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Notre <span className="text-amber">Craft</span> Digital
            </h2>
          </ScrollSection>
          <ScrollSection animation="fade-up" delay={0.1}>
            <p className="text-lg text-muted-foreground">
              De la conception à la réalisation, nous couvrons tous les aspects de votre transformation numérique.
            </p>
          </ScrollSection>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <ScrollSection key={service.title} animation="fade-up" delay={0.15 * index}>
              <CraftCard variant="bordered" className="h-full">
                <div className="p-3 rounded-lg bg-amber/10 text-amber mb-4 w-fit">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{service.description}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="!text-amber hover:!text-amber-deep p-0 h-auto font-medium"
                >
                  <Link href={service.href}>En savoir plus</Link>
                </Button>
              </CraftCard>
            </ScrollSection>
          ))}
        </div>

        <ScrollSection animation="fade-up" delay={0.5}>
          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-amber hover:bg-amber-deep text-white rounded-full px-10"
            >
              <Link href="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </ScrollSection>
      </div>
    </section>
  )
}
