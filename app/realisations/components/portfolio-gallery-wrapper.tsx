"use client"

import { Suspense } from "react"
import PortfolioGallerySection from "./portfolio-gallery-section"

function PortfolioGalleryFallback() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-lg text-gray-700">Chargement de notre portfolio...</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </div>
    </section>
  )
}

export default function PortfolioGalleryWrapper() {
  return (
    <Suspense fallback={<PortfolioGalleryFallback />}>
      <PortfolioGallerySection />
    </Suspense>
  )
}
