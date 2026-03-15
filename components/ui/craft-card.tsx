"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArchClipPath } from "./arch-frame"

interface CraftCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "arch" | "bordered"
  hover?: boolean
}

export function CraftCard({
  children,
  className,
  variant = "default",
  hover = true,
}: CraftCardProps) {
  const baseClasses = cn(
    "relative rounded-lg bg-card text-card-foreground overflow-hidden",
    hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber/5",
    className
  )

  if (variant === "arch") {
    return (
      <motion.div
        className={baseClasses}
        whileHover={hover ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.3 }}
      >
        <ArchClipPath>
          <div className="p-6">{children}</div>
        </ArchClipPath>
      </motion.div>
    )
  }

  if (variant === "bordered") {
    return (
      <motion.div
        className={cn(baseClasses, "group")}
        whileHover={hover ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border on hover */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          preserveAspectRatio="none"
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="8"
            fill="none"
            stroke="hsl(var(--amber))"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="animate-draw-line"
            style={{ strokeDashoffset: "100%" }}
          />
        </svg>
        <div className="p-6">{children}</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={baseClasses}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">{children}</div>
    </motion.div>
  )
}
