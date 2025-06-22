"use client"

import { MessageSquareText, CalendarCheck2, InfinityIcon, UserCheck2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const commitments = [
  {
    icon: MessageSquareText,
    title: "Communication Transparente et Régulière",
    description:
      "Nous vous tenons informés à chaque étape clé du projet et restons disponibles pour répondre à toutes vos questions.",
  },
  {
    icon: CalendarCheck2,
    title: "Respect des Délais Convenus",
    description:
      "Nous nous engageons sur un planning réaliste et mettons tout en œuvre pour livrer votre projet dans les temps impartis.",
  },
  {
    icon: InfinityIcon,
    title: "Solutions Digitales Évolutives et Pérennes",
    description:
      "Nous concevons des sites et applications capables de s'adapter à vos besoins futurs et aux évolutions technologiques.",
  },
  {
    icon: UserCheck2,
    title: "Support Réactif et Personnalisé",
    description:
      "Notre équipe reste à votre écoute après la mise en ligne pour vous assister et assurer la maintenance de votre solution.",
  },
]

export default function QualityCommitmentsSection() {
  const sectionTitleAnim = useScrollAnimation<HTMLHeadingElement>()
  const sectionSubtitleAnim = useScrollAnimation<HTMLParagraphElement>({ delay: 100 })

  return (
    <section className="bg-background py-20 sm:py-28">
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
            Nos Engagements pour une Collaboration <span className="text-brand-blue">Réussie</span>.
          </h2>
          <p
            ref={sectionSubtitleAnim.ref}
            className={cn("text-lg text-muted-foreground opacity-0", sectionSubtitleAnim.animationClassName)}
            style={sectionSubtitleAnim.style}
          >
            Votre confiance est notre moteur, la qualité notre promesse.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {commitments.map((commitment, index) => (
            <CommitmentCard key={commitment.title} commitment={commitment} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CommitmentCardProps {
  commitment: (typeof commitments)[0]
  index: number
}

function CommitmentCard({ commitment, index }: CommitmentCardProps) {
  const cardAnim = useScrollAnimation<HTMLDivElement>({ delay: (index + 1) * 100 }) // Default animationName is fade-in-up
  return (
    <Card
      ref={cardAnim.ref}
      className={cn(
        "flex flex-col sm:flex-row items-start p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 opacity-0",
        cardAnim.animationClassName,
      )}
      style={cardAnim.style}
    >
      <CardHeader className="p-0 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
        <div className="p-3 bg-brand-blue/10 rounded-full">
          <commitment.icon className="h-8 w-8 text-brand-blue" />
        </div>
      </CardHeader>
      <div>
        <CardTitle className="text-xl font-semibold text-foreground mb-2">{commitment.title}</CardTitle>
        <CardContent className="p-0">
          <p className="text-muted-foreground leading-relaxed">{commitment.description}</p>
        </CardContent>
      </div>
    </Card>
  )
}
