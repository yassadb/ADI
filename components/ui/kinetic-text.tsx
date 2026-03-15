"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface KineticTextProps {
  texts: string[]
  interval?: number
  className?: string
  tag?: "h1" | "h2" | "h3" | "span"
}

export function KineticText({
  texts,
  interval = 4000,
  className,
  tag: Tag = "h1",
}: KineticTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <Tag className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </Tag>
  )
}

interface KineticWordProps {
  text: string
  className?: string
  delay?: number
}

export function KineticWord({ text, className, delay = 0 }: KineticWordProps) {
  const words = text.split(" ")

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.3em]", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
