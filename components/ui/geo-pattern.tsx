"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GeoPatternProps {
  variant?: "star-8" | "rosette" | "tessellation" | "border"
  size?: number
  className?: string
  animate?: boolean
  color?: string
  opacity?: number
}

function Star8({ size, color }: { size: number; color: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.4
  const points: string[] = []

  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 * i) / 16
    const radius = i % 2 === 0 ? r : r * 0.5
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`)
  }

  return <polygon points={points.join(" ")} fill="none" stroke={color} strokeWidth={1} />
}

function Rosette({ size, color }: { size: number; color: string }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.35
  const petals = []

  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI * 2 * i) / 6
    const px = cx + r * Math.cos(angle)
    const py = cy + r * Math.sin(angle)
    petals.push(
      <circle key={i} cx={px} cy={py} r={r * 0.6} fill="none" stroke={color} strokeWidth={0.8} />
    )
  }

  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={0.8} />
      {petals}
    </>
  )
}

function Tessellation({ size, color }: { size: number; color: string }) {
  const unit = size / 4
  const lines = []

  for (let i = 0; i <= 4; i++) {
    lines.push(
      <line key={`h${i}`} x1={0} y1={i * unit} x2={size} y2={i * unit} stroke={color} strokeWidth={0.5} />,
      <line key={`v${i}`} x1={i * unit} y1={0} x2={i * unit} y2={size} stroke={color} strokeWidth={0.5} />
    )
    if (i < 4) {
      lines.push(
        <line key={`d1-${i}`} x1={i * unit} y1={i * unit} x2={(i + 1) * unit} y2={(i + 1) * unit} stroke={color} strokeWidth={0.5} />,
        <line key={`d2-${i}`} x1={(i + 1) * unit} y1={i * unit} x2={i * unit} y2={(i + 1) * unit} stroke={color} strokeWidth={0.5} />
      )
    }
  }

  return <>{lines}</>
}

function BorderPattern({ size, color }: { size: number; color: string }) {
  const unit = size / 8
  const d = []

  for (let i = 0; i < 8; i++) {
    const x = i * unit
    d.push(`M${x},0 L${x + unit / 2},${unit * 0.6} L${x + unit},0`)
  }

  return <path d={d.join(" ")} fill="none" stroke={color} strokeWidth={1} />
}

export function GeoPattern({
  variant = "star-8",
  size = 80,
  className,
  animate = true,
  color = "currentColor",
  opacity = 0.15,
}: GeoPatternProps) {
  const Wrapper = animate ? motion.svg : "svg"
  const animationProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity, scale: 1 },
        transition: { duration: 0.8, ease: "easeOut" },
      }
    : {}

  return (
    <Wrapper
      width={size}
      height={variant === "border" ? size / 4 : size}
      viewBox={`0 0 ${size} ${variant === "border" ? size / 4 : size}`}
      className={cn("pointer-events-none", className)}
      style={{ opacity: animate ? undefined : opacity }}
      {...animationProps}
    >
      {variant === "star-8" && <Star8 size={size} color={color} />}
      {variant === "rosette" && <Rosette size={size} color={color} />}
      {variant === "tessellation" && <Tessellation size={size} color={color} />}
      {variant === "border" && <BorderPattern size={size} color={color} />}
    </Wrapper>
  )
}

export function GeoPatternBackground({
  variant = "tessellation",
  className,
  opacity = 0.05,
}: {
  variant?: GeoPatternProps["variant"]
  className?: string
  opacity?: number
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute inset-0 animate-geo-spin" style={{ animationDuration: "120s" }}>
        <GeoPattern
          variant={variant}
          size={600}
          animate={false}
          opacity={opacity}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  )
}
