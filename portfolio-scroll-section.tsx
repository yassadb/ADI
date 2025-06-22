"use client"

import type React from "react"
import Image from "next/image"
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PortfolioItem {
  imageUrl: string
  title: string
  category: string
}

const PortfolioItemCard: React.FC<PortfolioItem> = ({ imageUrl, title, category }) => {
  return (
    <div className="w-[320px] sm:w-[380px] md:w-[420px] p-3 flex-shrink-0 group">
      <div className="bg-card rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:scale-[1.02]">
        <div className="aspect-[16/10] overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg?height=375&width=600&query=modern+website+mockup"}
            alt={`Maquette du projet ${title}`}
            width={600}
            height={375} // 16:10 ratio
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground truncate">{title}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </div>
    </div>
  )
}

const projectsData: PortfolioItem[] = [
  { imageUrl: "/portfolio/lumine-design-studio.jpeg", title: "LUMINE Design Studio", category: "Design d'Intérieur" },
  { imageUrl: "/portfolio/serenite-urbaine.jpeg", title: "Sérénité Urbaine", category: "Yoga & Bien-être" },
  { imageUrl: "/portfolio/saveurs-exception.jpeg", title: "Saveurs d'Exception", category: "Gastronomie sur mesure" },
  { imageUrl: "/portfolio/nomads-quest.jpeg", title: "Nomad's Quest", category: "Voyages d'Aventure" },
  { imageUrl: "/portfolio/lepi-dore.jpeg", title: "L'Épi Doré", category: "Boulangerie Artisanale" },
  { imageUrl: "/portfolio/momentum-conseil.jpeg", title: "Momentum Conseil", category: "Conseil aux Entreprises" },
  { imageUrl: "/portfolio/le-mot-juste.jpeg", title: "Le Mot Juste", category: "Librairie & Café" },
  { imageUrl: "/portfolio/concept-pme-innovante.jpeg", title: "Concept PME Innovante", category: "Site Vitrine" },
  {
    imageUrl: "/portfolio/concept-ecommerce-artisanat.jpeg",
    title: "E-commerce Artisanat",
    category: "Boutique en Ligne",
  },
]

export default function PortfolioScrollSection() {
  const portfolioItems = projectsData.map((p, i) => (
    // Corrected key to use index or a unique property like title if available and sanitized
    <PortfolioItemCard
      key={`${p.title.replace(/\s+/g, "-").toLowerCase()}-${i}`}
      imageUrl={p.imageUrl}
      title={p.title}
      category={p.category}
    />
  ))

  return (
    <section className="bg-secondary/30 py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 animate-fade-in-up">
          Nos Réalisations Parlent d'Elles-Mêmes.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
          Découvrez une sélection de projets qui illustrent notre passion pour le design et l'innovation.
        </p>
      </div>

      <div className="relative animate-fade-in animate-delay-200">
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none"></div>

        <AutoScrollCarousel items={portfolioItems} scrollSpeed={30} pauseOnHover={true} itemClassName="mx-2" />
      </div>
      <div className="container mx-auto text-center mt-16 animate-fade-in-up animate-delay-300">
        <Button asChild size="lg" variant="gradientBlue" className="rounded-full px-10 py-3.5">
          <Link href="/realisations">
            Explorer Notre Portfolio
            
          </Link>
        </Button>
      </div>
    </section>
  )
}
