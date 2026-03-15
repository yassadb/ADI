"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CraftCard } from "@/components/ui/craft-card"
import { ScrollSection } from "@/components/ui/scroll-section"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight, MonitorPlay, ShoppingCart, AppWindow, Paintbrush, Globe, Search, Smartphone, Database, BarChart3, MessageCircle } from "lucide-react"
import { analyzeProject, type ProjectAnalysis } from "@/app/actions/analyze-project"

const modules = [
  { id: "site-vitrine", label: "Site Vitrine", icon: MonitorPlay },
  { id: "e-commerce", label: "E-commerce", icon: ShoppingCart },
  { id: "app-web", label: "Application Web", icon: AppWindow },
  { id: "branding", label: "Branding", icon: Paintbrush },
  { id: "multi-langue", label: "Multi-langue", icon: Globe },
  { id: "seo", label: "SEO / Référencement", icon: Search },
  { id: "mobile", label: "App Mobile", icon: Smartphone },
  { id: "crm", label: "CRM / Base de données", icon: Database },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "chatbot", label: "Chatbot IA", icon: MessageCircle },
]

export function ProjectConfigurator() {
  const [selected, setSelected] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const toggleModule = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleAnalyze = useCallback(async () => {
    if (!description.trim() && selected.length === 0) return

    setIsAnalyzing(true)
    try {
      const selectedLabels = selected.map((id) => modules.find((m) => m.id === id)?.label || id)
      const result = await analyzeProject(description, selectedLabels)
      setAnalysis(result)
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [description, selected])

  const complexityColors = {
    simple: "text-emerald",
    moyen: "text-amber",
    complexe: "text-terracotta",
  }

  return (
    <div className="space-y-8">
      <ScrollSection animation="fade-up">
        <h3 className="text-xl font-semibold text-foreground mb-2">Composez votre projet</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Sélectionnez les fonctionnalités souhaitées et décrivez votre vision.
        </p>
      </ScrollSection>

      {/* Module grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {modules.map((mod, index) => {
          const isSelected = selected.includes(mod.id)
          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => toggleModule(mod.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 text-center",
                isSelected
                  ? "bg-amber/10 border-amber/40 text-amber shadow-sm shadow-amber/10"
                  : "bg-card border-border/50 text-muted-foreground hover:border-amber/20 hover:bg-amber/5"
              )}
            >
              <mod.icon className={cn("h-6 w-6", isSelected ? "text-amber" : "text-muted-foreground")} />
              <span className="text-xs font-medium">{mod.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Description */}
      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez votre projet en quelques lignes : objectifs, audience cible, fonctionnalités clés..."
          className="min-h-[100px] bg-background border-border/50 focus:border-amber/40 focus:ring-amber/30"
        />
      </div>

      {/* Analyze button */}
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || (!description.trim() && selected.length === 0)}
        className="bg-amber hover:bg-amber-deep text-white rounded-full px-8"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyse en cours...
          </>
        ) : (
          <>
            Analyser mon projet
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {/* Analysis result */}
      {analysis && (
        <ScrollSection animation="fade-up">
          <CraftCard variant="bordered" className="bg-card">
            <h4 className="text-lg font-semibold text-foreground mb-4">Analyse de votre projet</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Complexité</p>
                <p className={cn("text-lg font-bold capitalize", complexityColors[analysis.estimatedComplexity])}>
                  {analysis.estimatedComplexity}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Délai estimé</p>
                <p className="text-lg font-bold text-foreground">{analysis.estimatedTimeline}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Budget indicatif</p>
                <p className="text-lg font-bold text-amber">{analysis.estimatedBudgetRange}</p>
              </div>
            </div>

            {analysis.suggestedServices.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Services recommandés</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedServices.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-amber/10 text-amber text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.questions.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Questions pour affiner</p>
                <ul className="space-y-1.5">
                  {analysis.questions.map((q, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber mt-0.5">•</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CraftCard>
        </ScrollSection>
      )}
    </div>
  )
}
