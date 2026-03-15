"use client"

import { useState } from "react"
import { CraftCard } from "@/components/ui/craft-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, FileText, Mail, Share2, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

const contentTypes = [
  { id: "blog" as const, label: "Article Blog", icon: FileText },
  { id: "proposal" as const, label: "Proposition", icon: Briefcase },
  { id: "email" as const, label: "Email", icon: Mail },
  { id: "social" as const, label: "Social Media", icon: Share2 },
]

const tones = [
  { id: "professionnel" as const, label: "Professionnel" },
  { id: "décontracté" as const, label: "Décontracté" },
  { id: "technique" as const, label: "Technique" },
]

export default function ContentPage() {
  const [type, setType] = useState<"blog" | "proposal" | "email" | "social">("blog")
  const [tone, setTone] = useState<"professionnel" | "décontracté" | "technique">("professionnel")
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setResult("")

    try {
      const { generateContent } = await import("@/app/actions/generate-content")
      const stream = await generateContent(type, prompt, tone)

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let text = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setResult(text)
      }
    } catch (error) {
      console.error("Generation error:", error)
      setResult("Erreur lors de la génération. Vérifiez votre clé API Anthropic.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Générateur de Contenu</h1>
        <p className="text-muted-foreground mt-1">Créez du contenu optimisé avec l'IA.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="space-y-6">
          {/* Content type */}
          <CraftCard>
            <h3 className="text-sm font-medium text-foreground mb-3">Type de contenu</h3>
            <div className="grid grid-cols-2 gap-2">
              {contentTypes.map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => setType(ct.id)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all",
                    type === ct.id
                      ? "bg-amber/10 text-amber border border-amber/30"
                      : "bg-background border border-border/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ct.icon className="h-4 w-4" />
                  {ct.label}
                </button>
              ))}
            </div>
          </CraftCard>

          {/* Tone */}
          <CraftCard>
            <h3 className="text-sm font-medium text-foreground mb-3">Ton</h3>
            <div className="flex gap-2">
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    tone === t.id
                      ? "bg-amber text-white"
                      : "bg-background border border-border/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </CraftCard>

          {/* Prompt */}
          <CraftCard>
            <h3 className="text-sm font-medium text-foreground mb-3">Brief / Sujet</h3>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez le contenu que vous souhaitez générer..."
              className="min-h-[120px] bg-background border-border/50 focus:border-amber/40 focus:ring-amber/30"
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="mt-4 bg-amber hover:bg-amber-deep text-white rounded-full px-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer
                </>
              )}
            </Button>
          </CraftCard>
        </div>

        {/* Output panel */}
        <CraftCard className="min-h-[400px]">
          <h3 className="text-sm font-medium text-foreground mb-3">Résultat</h3>
          {result ? (
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
              {result}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
              Le contenu généré apparaîtra ici
            </div>
          )}
        </CraftCard>
      </div>
    </div>
  )
}
