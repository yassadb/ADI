import type React from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
}

interface ServiceFeaturesSectionProps {
  title: string
  features: FeatureItem[]
}

const ServiceFeaturesSection: React.FC<ServiceFeaturesSectionProps> = ({ title, features }) => {
  const { ref: sectionTitleRef, animate: sectionTitleAnimate } = useScrollAnimation()
  const { ref: featuresRef, animate: featuresAnimate } = useScrollAnimation()

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2
          ref={sectionTitleRef}
          className={`text-3xl font-semibold mb-8 ${sectionTitleAnimate ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          {title}
        </h2>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${featuresAnimate ? `animate-fade-in-up delay-${index * 100}` : "opacity-0 translate-y-10"}`}
            >
              <div className="text-4xl text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceFeaturesSection
