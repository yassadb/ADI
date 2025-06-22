"use client"

import { Ear, LayoutTemplate, Code2, CheckCircle2, Rocket } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const processSteps = [
  {
    stepNumber: 1,
    icon: Ear,
    title: "Écoute & Analyse Stratégique",
    description:
      "Immersion complète dans vos besoins, objectifs et marché cible au Maroc pour définir une stratégie digitale claire et pertinente.",
  },
  {
    stepNumber: 2,
    icon: LayoutTemplate,
    title: "Conception & Maquettage UX/UI",
    description:
      "Création d'interfaces intuitives et esthétiques, centrées sur l'expérience utilisateur (UX) et l'identité visuelle (UI) de votre marque.",
  },
  {
    stepNumber: 3,
    icon: Code2,
    title: "Développement & Réalisation Technique",
    description:
      "Transformation des maquettes en solutions web fonctionnelles, robustes et performantes, utilisant les technologies les plus adaptées.",
  },
  {
    stepNumber: 4,
    icon: CheckCircle2,
    title: "Tests & Assurance Qualité Rigoureux",
    description:
      "Chaque fonctionnalité est testée minutieusement sur divers appareils et navigateurs pour une expérience utilisateur sans faille.",
  },
  {
    stepNumber: 5,
    icon: Rocket,
    title: "Lancement & Accompagnement Post-Mise en Ligne",
    description:
      "Déploiement fluide de votre projet et accompagnement continu pour le suivi, la maintenance et les évolutions futures.",
  },
]

export default function ProcessStepsSection() {
  const sectionTitleAnim = useScrollAnimation<HTMLHeadingElement>()
  const sectionSubtitleAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 100 })

  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={sectionTitleAnim.ref}
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4 opacity-0",
              sectionTitleAnim.animationClassName,
            )}
            style={sectionTitleAnim.style}
          >
            Les Étapes Clés de Votre Projet Digital.
          </h2>
          <p
            ref={sectionSubtitleAnim.ref}
            className={cn("text-lg text-muted-foreground opacity-0", sectionSubtitleAnim.animationClassName)}
            style={sectionSubtitleAnim.style}
          >
            Un parcours collaboratif vers l'excellence numérique.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="space-y-10">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={step.stepNumber} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProcessStepCardProps {
  step: (typeof processSteps)[0]
  index: number
}

function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  const cardAnim = useScrollAnimation<HTMLDivElement>({ delay: (index + 1) * 150 }) // Default animationName is fade-in-up
  return (
    <Card
      ref={cardAnim.ref}
      className={cn(
        "bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 overflow-hidden",
        cardAnim.animationClassName,
      )}
      style={cardAnim.style}
    >
      <div className="md:flex items-center">
        <div className="md:w-1/3 p-6 md:p-8 bg-brand-blue/5 flex flex-col items-center justify-center text-center md:border-r border-border/50">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-blue text-brand-blue-foreground text-3xl font-bold mb-4 shadow-md">
            {step.stepNumber}
          </div>
          <step.icon className="h-10 w-10 text-brand-blue mb-2" />
        </div>
        <div className="md:w-2/3 p-6 md:p-8">
          <CardTitle className="text-xl font-semibold text-foreground mb-3">{step.title}</CardTitle>
          <CardContent className="p-0">
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
