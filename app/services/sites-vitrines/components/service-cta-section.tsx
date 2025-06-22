import type React from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface ServiceCTASectionProps {
  title: string
  paragraph: string
  buttonText: string
  buttonLink: string
  backgroundColor?: string
  textColor?: string
}

const ServiceCTASection: React.FC<ServiceCTASectionProps> = ({
  title,
  paragraph,
  buttonText,
  buttonLink,
  backgroundColor = "bg-primary",
  textColor = "text-white",
}) => {
  const { ref: titleRef, animation: titleAnimation } = useScrollAnimation()
  const { ref: paragraphRef, animation: paragraphAnimation } = useScrollAnimation()
  const { ref: buttonRef, animation: buttonAnimation } = useScrollAnimation()

  return (
    <section className={`${backgroundColor} ${textColor} py-16`}>
      <div className="container mx-auto text-center">
        <h2 ref={titleRef} className={`text-3xl md:text-4xl font-bold mb-4 ${titleAnimation}`}>
          {title}
        </h2>
        <p ref={paragraphRef} className={`text-lg mb-8 ${paragraphAnimation}`}>
          {paragraph}
        </p>
        <a
          ref={buttonRef}
          href={buttonLink}
          className={`inline-block bg-secondary ${textColor} py-2 px-6 rounded-md hover:bg-opacity-80 transition-colors ${buttonAnimation}`}
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}

export default ServiceCTASection
