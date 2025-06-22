"use client"

import React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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
  const { ref: sectionTitleRef, animationClassName: sectionTitleAnimation } = useScrollAnimation<HTMLHeadingElement>()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2
          ref={sectionTitleRef}
          className={`text-3xl font-semibold mb-8 ${sectionTitleAnimation}`}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const { ref, animationClassName } = useScrollAnimation<HTMLDivElement>({ delay: index * 150 })
            return (
              <div
                key={index}
                ref={ref}
                className={`p-6 bg-white rounded-lg shadow-md ${animationClassName}`}
              >
                <div className="text-5xl text-primary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default KeyBenefitsSection
