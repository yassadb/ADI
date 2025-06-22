"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

type ServiceCategory = "Site Vitrine" | "E-commerce" | "Application Web" | "Branding"
interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  category: ServiceCategory
  services: string[]
  detailsLink?: string
}

const initialProjects: Project[] = [
  {
    id: "concept-pme-innovante",
    title: "Concept : Site Vitrine PME Innovante",
    description: "Un design moderne et épuré pour valoriser l'innovation et attirer les talents.",
    imageUrl: "/portfolio/concept-pme-innovante.jpeg",
    category: "Site Vitrine",
    services: ["Design UI/UX", "Branding Stratégique"],
  },
  {
    id: "concept-ecommerce-artisanat",
    title: "Concept : E-commerce Artisanat Marocain",
    description: "Une plateforme élégante pour mettre en avant le savoir-faire local et faciliter les ventes en ligne.",
    imageUrl: "/portfolio/concept-ecommerce-artisanat.jpeg",
    category: "E-commerce",
    services: ["Design UI/UX", "Développement E-commerce", "Photographie Produits"],
  },
  {
    id: "concept-app-gestion",
    title: "Concept : Outil de Gestion Simplifié",
    description: "Interface intuitive pour une application métier visant à optimiser les processus internes.",
    imageUrl: "/portfolio/concept-app-gestion.jpeg",
    category: "Application Web",
    services: ["Design UX/UI", "Maquettage Fonctionnel", "Développement Backend"],
  },
  {
    id: "concept-branding-startup",
    title: "Concept : Identité Visuelle Startup Tech",
    description: "Création d'une identité de marque forte et mémorable pour une jeune entreprise technologique.",
    imageUrl: "/portfolio/concept-branding-startup.jpeg",
    category: "Branding",
    services: ["Logo Design", "Charte Graphique Complète", "Stratégie de Marque"],
  },
  {
    id: "lumine-design-studio",
    title: "Projet : Lumine Design Studio",
    description:
      "Site vitrine élégant pour un studio de design d'intérieur, mettant en avant créativité et sophistication.",
    imageUrl: "/portfolio/lumine-design-studio.jpeg",
    category: "Site Vitrine",
    services: ["Web Design", "Photographie", "SEO"],
  },
  {
    id: "saveurs-exception",
    title: "Projet : Saveurs d'Exception",
    description:
      "Boutique en ligne gastronomique proposant des produits d'exception avec une expérience utilisateur raffinée.",
        imageUrl: "/portfolio/saveurs-exception.jpeg",
    category: "E-commerce",
    services: ["E-commerce", "Branding", "Marketing Digital"],
  },
]

const serviceCategories: ServiceCategory[] = ["Site Vitrine", "E-commerce", "Application Web", "Branding"]

export default function PortfolioGallerySection() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<ServiceCategory | "Tous">("Tous")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      const categoryMap: { [key: string]: ServiceCategory } = {
        "Site Vitrine": "Site Vitrine",
        "E-commerce": "E-commerce",
        "Application Web": "Application Web",
        Branding: "Branding",
      }
      const mappedCategory = categoryMap[categoryParam as keyof typeof categoryMap]
      if (mappedCategory && serviceCategories.includes(mappedCategory)) {
        setActiveFilter(mappedCategory)
      } else if (serviceCategories.includes(categoryParam as ServiceCategory)) {
        setActiveFilter(categoryParam as ServiceCategory)
      }
    }
  }, [searchParams])

  if (!mounted) {
    return (
      <section className="bg-background py-20 sm:py-32">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement du portfolio...</p>
        </div>
      </section>
    )
  }

  const filteredProjects =
    activeFilter === "Tous" ? initialProjects : initialProjects.filter((project) => project.category === activeFilter)

  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground animate-fade-in-up">
            Explorez notre savoir-faire à travers une sélection de projets et concepts.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 animate-fade-in-up animate-delay-100">
          <Button
            variant={activeFilter === "Tous" ? "default" : "outline"}
            onClick={() => setActiveFilter("Tous")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm transition-all duration-200",
              activeFilter === "Tous"
                ? "bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90"
                : "border-border text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:border-accent",
            )}
          >
            Tous les projets
          </Button>
          {serviceCategories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm transition-all duration-200",
                activeFilter === category
                  ? "bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90"
                  : "border-border text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:border-accent",
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grille de Projets */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <CardHeader className="p-0 relative">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={`Image pour ${project.title}`}
                      width={600}
                      height={375}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/portfolio-project.png"
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl font-semibold text-foreground mb-2 group-hover:text-brand-blue transition-colors duration-150">
                    {project.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[3.5rem] line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.slice(0, 3).map((service, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent"
                      >
                        <Tag className="h-3.5 w-3.5 mr-1.5" />
                        {service}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-10 animate-fade-in">
            Aucun projet ne correspond à cette catégorie pour le moment.
          </p>
        )}
      </div>
    </section>
  )
}
