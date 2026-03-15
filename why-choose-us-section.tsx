"use client"

import { Compass, Target, Paintbrush, Code2, Rocket } from "lucide-react"
import { CraftCard } from "@/components/ui/craft-card"
import { ScrollSection } from "@/components/ui/scroll-section"

const steps = [
  {
    icon: Compass,
    title: "Découverte",
    description: "On écoute, on comprend votre vision, vos objectifs et votre marché.",
    step: "01",
  },
  {
    icon: Target,
    title: "Stratégie",
    description: "On définit ensemble la roadmap, l'architecture et les priorités.",
    step: "02",
  },
  {
    icon: Paintbrush,
    title: "Création",
    description: "Design UI/UX unique, maquettes et prototypes interactifs.",
    step: "03",
  },
  {
    icon: Code2,
    title: "Développement",
    description: "Code propre, performant et optimisé avec les dernières technologies.",
    step: "04",
  },
  {
    icon: Rocket,
    title: "Lancement",
    description: "Déploiement, tests finaux et accompagnement post-lancement.",
    step: "05",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollSection animation="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Le <span className="text-amber">Parcours</span> — De l'Idée au Lancement
            </h2>
          </ScrollSection>
          <ScrollSection animation="fade-up" delay={0.1}>
            <p className="text-lg text-muted-foreground">
              Un processus rodé en 5 étapes pour transformer votre vision en réalité digitale.
            </p>
          </ScrollSection>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-amber/20 via-amber/40 to-amber/20" />

            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <ScrollSection key={step.title} animation="fade-up" delay={0.15 * index}>
                  <div className="flex flex-col items-center text-center">
                    {/* Step dot */}
                    <div className="relative z-10 mb-6">
                      <div className="w-[120px] h-[120px] rounded-full bg-card border-2 border-amber/30 flex items-center justify-center shadow-lg shadow-amber/5">
                        <step.icon className="h-10 w-10 text-amber" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber text-white text-xs font-bold flex items-center justify-center shadow-md">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            {/* Vertical connecting line */}
            <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-gradient-to-b from-amber/20 via-amber/40 to-amber/20" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <ScrollSection key={step.title} animation="fade-left" delay={0.1 * index}>
                  <div className="relative flex gap-6 items-start">
                    {/* Dot on the line */}
                    <div className="absolute -left-8 top-2 w-10 h-10 rounded-full bg-amber text-white text-xs font-bold flex items-center justify-center shadow-md z-10">
                      {step.step}
                    </div>

                    <CraftCard className="flex-1 ml-4">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="h-6 w-6 text-amber flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </CraftCard>
                  </div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
