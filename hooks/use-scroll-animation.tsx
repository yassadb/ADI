"use client"

import type React from "react"

import { useEffect, useRef, useState, type CSSProperties } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  delay?: number // in ms
  animationName?: "fade-in" | "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-up"
  triggerOnce?: boolean
  duration?: number // in ms
}

export interface ScrollAnimationResult<T extends HTMLElement> {
  ref: React.RefObject<T>
  style: CSSProperties
  animationClassName: string
  isVisible: boolean
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {},
): ScrollAnimationResult<T> {
  const {
    threshold = 0.1,
    delay = 0,
    animationName = "fade-in-up",
    triggerOnce = true,
    duration = 500, // Default duration 500ms
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    // Set initial opacity to 0 via style to prevent flash of content before JS runs
    // currentRef.style.opacity = '0';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, triggerOnce])

  const style: CSSProperties = {
    animationDelay: isVisible ? `${delay}ms` : undefined,
    animationDuration: isVisible ? `${duration}ms` : undefined,
    // The initial opacity-0 should be on the className of the component
  }

  const animationClassName = isVisible ? `animate-${animationName}` : ""

  return { ref, style, animationClassName, isVisible }
}
