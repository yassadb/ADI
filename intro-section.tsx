"use client"

import { useScrollAnimation, type ScrollAnimationResult } from "@/hooks/use-scroll-animation" // Ensure this path is correct
import { cn } from "@/lib/utils"
import Image from "next/image" // Import Next.js Image component
import { useRef } from "react"

export default function IntroSection() {
  const titleAnim = useScrollAnimation<HTMLHeadingElement>({ animationName: "fade-in-up", duration: 700 })
  const paragraphAnim = useScrollAnimation<HTMLParagraphElement>({
    animationName: "fade-in-up",
    delay: 150,
    duration: 700,
  })
  const imageAnim = useScrollAnimation<HTMLDivElement>({ animationName: "fade-in-up", delay: 300, duration: 700 }) // Changed to HTMLDivElement for the image wrapper

  const listItemAnims = useRef<(ScrollAnimationResult<HTMLDivElement> | null)[]>([null, null, null])
  listItemAnims.current = listItemAnims.current.map((_, index) => {
    return useScrollAnimation<HTMLDivElement>({ animationName: "fade-in-up", delay: 300 + index * 100, duration: 500 })
  })

  return (
    <section className="bg-secondary/30 py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
          // This div can also have an animation if desired, e.g. for staggering children
          >
            <h2
              ref={titleAnim.ref}
              className={cn(
                "text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6 opacity-0",
                titleAnim.animationClassName,
              )}
              style={titleAnim.style}
            >
              L'Art de l'Impact Digital,
              <br />
              <span className="text-brand-blue">Réinventé pour le Maroc.</span>
            </h2>
            <p
              ref={paragraphAnim.ref}
              className={cn(
                "text-lg text-muted-foreground mb-8 leading-relaxed opacity-0",
                paragraphAnim.animationClassName,
              )}
              style={paragraphAnim.style}
            >
              Chez <strong className="text-foreground">Atlas Digital Impact</strong>, nous ne nous contentons pas de
              créer des sites web. Nous forgeons des expériences digitales mémorables qui captivent, convertissent et
              construisent des relations durables. Notre agence, ancrée à Bruxelles, est animée par une passion pour
              l'excellence et un engagement profond envers le succès des entreprises marocaines.
            </p>
            {/* For list items, you can apply individual animations or animate the container */}
            <div className="space-y-4 mb-10">
              {[
                { iconName: "Target", text: "Stratégies digitales sur mesure, alignées sur vos objectifs." },
                { iconName: "Palette", text: "Designs élégants et intuitifs qui reflètent votre marque." },
                { iconName: "Code2", text: "Développement robuste utilisant les dernières technologies." },
              ].map((item, index) => {
                // Example of animating list items individually
                const itemAnim = listItemAnims.current[index]!
                // Dynamically require Lucide icons or pass them as components if preferred
                // For simplicity, assuming icons are handled (e.g. by name or pre-imported)
                // const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={itemAnim.ref}
                    className={cn("flex items-start opacity-0", itemAnim.animationClassName)}
                    style={itemAnim.style}
                  >
                    {/* <IconComponent className="h-6 w-6 text-brand-blue mr-3 mt-1 flex-shrink-0" /> */}
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                )
              })}
            </div>
            {/* Button animation */}
            {(() => {
              const btnAnim = useScrollAnimation<HTMLDivElement>({
                animationName: "fade-in-up",
                delay: 600,
                duration: 500,
              })
              return (
                <div ref={btnAnim.ref} className={cn("opacity-0", btnAnim.animationClassName)} style={btnAnim.style}>
                  {/* Original Button component here, wrapped for animation */}
                  {/* <Button asChild ...> <Link ...> </Button> */}
                </div>
              )
            })()}
          </div>
          <div
            ref={imageAnim.ref}
            className={cn("relative opacity-0", imageAnim.animationClassName)}
            style={imageAnim.style}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/portfolio/Illustration abstraite de l'impact digital.jpeg"
                alt="Illustration abstraite de l'impact digital"
                width={800}
                height={600}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-36 h-36 bg-sky-500/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
