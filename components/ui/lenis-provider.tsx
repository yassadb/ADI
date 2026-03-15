"use client"

import { useEffect, useRef } from "react"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any
    let raf: number

    async function init() {
      const Lenis = (await import("lenis")).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      function animate(time: number) {
        lenis.raf(time)
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    }

    init()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
