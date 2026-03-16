"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { X, Send, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { GeoPattern } from "@/components/ui/geo-pattern"
import { ChatMessage } from "./chat-message"
import { motion, AnimatePresence } from "framer-motion"

const suggestions = [
  "Quels services proposez-vous ?",
  "Combien coûte un site web ?",
  "Quel est votre processus de travail ?",
  "Je veux un devis pour mon projet",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, status, sendMessage } = useChat({
    id: "atlas-consultation",
    transport: {
      sendMessages: async ({ messages }) => {
        const { chat } = await import("@/app/actions/chat")
        const response = await chat(messages)
        return response.body as ReadableStream
      },
      reconnectToStream: async () => {
        // No reconnect support for now
        return undefined as unknown as ReadableStream
      },
    },
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const handleSuggestion = (text: string) => {
    sendMessage({ text })
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber hover:bg-amber-deep text-white shadow-lg shadow-amber/30 flex items-center justify-center transition-colors duration-200"
            aria-label="Ouvrir la consultation"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 z-50 w-full sm:w-[420px] h-full sm:h-[calc(100vh-2rem)] sm:bottom-4 sm:right-4 sm:rounded-2xl bg-background border border-border/50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-card px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber/10 flex items-center justify-center">
                  <GeoPattern variant="star-8" size={22} color="hsl(var(--amber))" opacity={0.7} animate={false} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Espace Consultation</h3>
                  <p className="text-xs text-muted-foreground">Atlas Digital Impact</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="mb-4">
                    <GeoPattern variant="rosette" size={64} color="hsl(var(--amber))" opacity={0.2} animate={true} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Bienvenue !</h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    Comment pouvons-nous vous aider avec votre projet digital ?
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="text-left text-sm px-4 py-2.5 rounded-xl bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-amber/30 hover:bg-amber/5 transition-all duration-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  // Extract text content from parts
                  const textContent =
                    msg.parts
                      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
                      .map((p) => p.text)
                      .join("") || ""

                  if (!textContent) return null

                  return (
                    <ChatMessage
                      key={msg.id}
                      role={msg.role as "user" | "assistant"}
                      content={textContent}
                    />
                  )
                })
              )}

              {/* Loading indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
                      <GeoPattern variant="star-8" size={20} color="hsl(var(--amber))" opacity={0.7} animate={false} />
                    </div>
                  </div>
                  <div className="bg-amber/10 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-amber/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-amber/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-border/50 px-4 py-3 bg-card/50">
              <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/40 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                    inputValue.trim() && !isLoading
                      ? "bg-amber hover:bg-amber-deep text-white shadow-sm"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  aria-label="Envoyer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
