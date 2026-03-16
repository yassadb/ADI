"use client"

import type React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
}

interface ServiceFeaturesSectionProps {
  title: string
  features: FeatureItem[]
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const { ref, animationClassName } = useScrollAnimation({ delay: index * 150 })
  return (
    <div
      ref={ref}
      className={`p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${animationClassName}`}
    >
      <div className="text-4xl text-primary mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-700">{feature.description}</p>
    </div>
  )
}

const ServiceFeaturesSection: React.FC<ServiceFeaturesSectionProps> = ({ title, features }) => {
  const { ref: sectionTitleRef, animationClassName: sectionTitleAnimation } = useScrollAnimation()

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
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceFeaturesSection
