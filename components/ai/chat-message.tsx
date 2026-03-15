"use client"

import { cn } from "@/lib/utils"
import { GeoPattern } from "@/components/ui/geo-pattern"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant"

  return (
    <div className={cn("flex gap-3 mb-4", isAssistant ? "justify-start" : "justify-end")}>
      {isAssistant && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
            <GeoPattern variant="star-8" size={20} color="hsl(var(--amber))" opacity={0.7} animate={false} />
          </div>
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isAssistant
            ? "bg-amber/10 text-foreground rounded-bl-md"
            : "bg-indigo/15 text-foreground rounded-br-md"
        )}
      >
        {/* Simple text rendering — no markdown for now */}
        <div className="whitespace-pre-wrap break-words">{content}</div>
      </div>
    </div>
  )
}
