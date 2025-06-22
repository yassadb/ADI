import type React from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface ShowcaseSectionProps {
  title: string
  description: string
  images: string[] // Array of image URLs
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ title, description, images }) => {
  const { ref: titleRef, animation: titleAnimation } = useScrollAnimation()
  const { ref: descriptionRef, animation: descriptionAnimation } = useScrollAnimation()
  const { ref: imagesRef, animation: imagesAnimation } = useScrollAnimation()

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 ref={titleRef} className={`text-3xl font-bold mb-4 ${titleAnimation}`}>
          {title}
        </h2>
        <p ref={descriptionRef} className={`text-gray-600 mb-8 ${descriptionAnimation}`}>
          {description}
        </p>
        <div ref={imagesRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${imagesAnimation}`}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Showcase ${index + 1}`}
              className="rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
