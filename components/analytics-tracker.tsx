"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

function generateSessionId() {
  if (typeof window === "undefined") return ""
  let sessionId = sessionStorage.getItem("adi_session")
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem("adi_session", sessionId)
  }
  return sessionId
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const eventsBuffer = useRef<Array<Record<string, unknown>>>([])

  useEffect(() => {
    const sessionId = generateSessionId()

    // Track page view
    eventsBuffer.current.push({
      event_type: "page_view",
      page: pathname,
      session_id: sessionId,
      created_at: new Date().toISOString(),
    })

    // Flush events every 30 seconds
    const interval = setInterval(() => {
      if (eventsBuffer.current.length > 0) {
        const events = [...eventsBuffer.current]
        eventsBuffer.current = []

        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          navigator.sendBeacon(
            "/api/analytics",
            new Blob([JSON.stringify({ events })], { type: "application/json" })
          )
        }
      }
    }, 30000)

    // Flush on unmount / page leave
    const handleBeforeUnload = () => {
      if (eventsBuffer.current.length > 0) {
        navigator.sendBeacon(
          "/api/analytics",
          new Blob([JSON.stringify({ events: eventsBuffer.current })], { type: "application/json" })
        )
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      clearInterval(interval)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [pathname])

  return null
}
