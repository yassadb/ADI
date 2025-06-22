"use client"

import type React from "react"
import { motion } from "framer-motion"

interface ServiceHeroSectionProps {
  badge: string
  title: string
  paragraph: string
  imageSrc: string
  imageAlt: string
}

const ServiceHeroSection: React.FC<ServiceHeroSectionProps> = ({ badge, title, paragraph, imageSrc, imageAlt }) => {
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  const paragraphVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
  }

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.span
              className="inline-block bg-primary-100 text-primary-600 py-1 px-3 rounded-full text-sm font-medium mb-4"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
            >
              {badge}
            </motion.span>
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-gray-700 text-lg mb-8"
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
            >
              {paragraph}
            </motion.p>
          </div>
          <div>
            <img src={imageSrc || "/placeholder.svg"} alt={imageAlt} className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceHeroSection
