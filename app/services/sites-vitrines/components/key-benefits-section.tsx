"use client"

import React from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface KeyBenefit {
  title: string
  description: string
  icon: React.ReactNode
}

interface KeyBenefitsSectionProps {
  title: string
  benefits: KeyBenefit[]
}

const KeyBenefitsSection: React.FC<KeyBenefitsSectionProps> = ({ title, benefits }) => {
  const { ref: sectionTitleRef, animate: sectionTitleAnimate } = useScrollAnimation()

  const benefitRefs = React.useRef<(HTMLElement | null)[]>([])
  benefitRefs.current = benefits.map((_, i) => benefitRefs.current[i] || null)

  const benefitAnimations = benefits.map((_, i) => useScrollAnimation())

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2
          ref={sectionTitleRef}
          className={`text-3xl font-semibold mb-8 ${sectionTitleAnimate ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (benefitRefs.current[index] = el)}
              className={`p-6 bg-white rounded-lg shadow-md ${benefitAnimations[index].animate ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="text-5xl text-primary mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyBenefitsSection
