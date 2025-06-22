import type React from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface TargetAudienceSectionProps {
  title: string
  description: string
  targetAudiences: string[]
}

const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ title, description, targetAudiences }) => {
  const { ref: titleRef, animation: titleAnimation } = useScrollAnimation()
  const { ref: descriptionRef, animation: descriptionAnimation } = useScrollAnimation()
  const audienceRefs = targetAudiences.map(() => useScrollAnimation())

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
            <li
              key={index}
              ref={audienceRefs[index].ref}
              className={`text-gray-700 mb-2 ${audienceRefs[index].animation}`}
            >
              {audience}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TargetAudienceSection
