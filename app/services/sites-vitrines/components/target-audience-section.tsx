"use client"

import type React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface TargetAudienceSectionProps {
  title: string
  description: string
  targetAudiences: string[]
}

function AudienceItem({ audience, index }: { audience: string; index: number }) {
  const { ref, animationClassName } = useScrollAnimation({ delay: index * 150 })
  return (
    <li
      ref={ref}
      className={`text-gray-700 mb-2 ${animationClassName}`}
    >
      {audience}
    </li>
  )
}

const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ title, description, targetAudiences }) => {
  const { ref: titleRef, animationClassName: titleAnimation } = useScrollAnimation()
  const { ref: descriptionRef, animationClassName: descriptionAnimation } = useScrollAnimation({ delay: 150 })

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className={`text-3xl font-semibold text-gray-800 mb-4 ${titleAnimation}`}>
          {title}
        </h2>
        <p ref={descriptionRef} className={`text-gray-600 leading-relaxed mb-8 ${descriptionAnimation}`}>
          {description}
        </p>
        <ul className="list-disc pl-6">
          {targetAudiences.map((audience, index) => (
            <AudienceItem key={index} audience={audience} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TargetAudienceSection
