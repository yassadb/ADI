"use client"

import { cn } from "@/lib/utils"

interface ArchFrameProps {
  children: React.ReactNode
  className?: string
  borderColor?: string
  showArch?: boolean
}

export function ArchFrame({
  children,
  className,
  borderColor = "hsl(var(--amber))",
  showArch = true,
}: ArchFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {showArch && (
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0,60 L0,30 Q0,0 30,0 L370,0 Q400,0 400,30 L400,60"
            fill="none"
            stroke={borderColor}
            strokeWidth={1.5}
            opacity={0.4}
          />
        </svg>
      )}
      <div className={cn(showArch && "pt-4")}>{children}</div>
    </div>
  )
}

export function ArchClipPath({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        clipPath: "polygon(0% 8%, 3% 3%, 8% 0.5%, 15% 0%, 85% 0%, 92% 0.5%, 97% 3%, 100% 8%, 100% 100%, 0% 100%)",
      }}
    >
      {children}
    </div>
  )
}
