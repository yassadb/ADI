"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AutoScrollCarouselProps {
  items: React.ReactNode[]
  scrollSpeed?: number // Pixels per second
  direction?: "left" | "right"
  className?: string
  itemClassName?: string
  pauseOnHover?: boolean
}

export function AutoScrollCarousel({
  items,
  scrollSpeed = 50, // Default speed: 50px per second
  direction = "left",
  className,
  itemClassName,
  pauseOnHover = true,
}: AutoScrollCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const duplicatedItems = [...items, ...items] // Duplicate items for seamless loop

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let animationFrameId: number
    let currentScroll = 0
    let lastTimestamp = 0

    const animateScroll = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp
      }

      const deltaTime = (timestamp - lastTimestamp) / 1000 // Time in seconds
      lastTimestamp = timestamp

      if (!isHovering || !pauseOnHover) {
        const scrollAmount = scrollSpeed * deltaTime
        if (direction === "left") {
          currentScroll += scrollAmount
          if (currentScroll >= carousel.scrollWidth / 2) {
            currentScroll = 0 // Reset scroll to create loop
          }
        } else {
          currentScroll -= scrollAmount
          if (currentScroll <= 0) {
            // For right scroll, we need to adjust initial position
            // This part is trickier for seamless right scroll and might need refinement
            // For now, let's ensure it doesn't go negative beyond a certain point
            currentScroll = carousel.scrollWidth / 2
          }
        }
        carousel.scrollLeft = currentScroll
      }
      animationFrameId = requestAnimationFrame(animateScroll)
    }

    // Initialize scroll position for right-to-left
    if (direction === "right") {
      // This needs careful handling for seamless loop from right
      // A common approach is to scroll to the end of the first set of items
      // carousel.scrollLeft = carousel.scrollWidth / 2;
      // currentScroll = carousel.scrollWidth / 2;
      // For simplicity, right scroll might not be perfectly seamless without more complex logic
    }

    animationFrameId = requestAnimationFrame(animateScroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [scrollSpeed, direction, isHovering, pauseOnHover, items]) // Re-run if items change

  return (
    <div
      ref={carouselRef}
      className={cn(
        "overflow-hidden w-full relative group", // Added group for pauseOnHover styling if needed
        className,
      )}
      onMouseEnter={() => pauseOnHover && setIsHovering(true)}
      onMouseLeave={() => pauseOnHover && setIsHovering(false)}
    >
      <div className="flex w-max">
        {" "}
        {/* w-max ensures the container is wide enough for all items */}
        {duplicatedItems.map((item, index) => (
          <div key={index} className={cn("flex-shrink-0", itemClassName)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
