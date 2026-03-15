"use server"

import { generateObject } from "ai"
import { z } from "zod"
import { models } from "@/lib/ai/models"

const projectAnalysisSchema = z.object({
  suggestedServices: z.array(z.string()).describe("Services recommandés basés sur la description"),
  estimatedComplexity: z.enum(["simple", "moyen", "complexe"]).describe("Niveau de complexité estimé"),
  estimatedTimeline: z.string().describe("Délai estimé en semaines"),
  estimatedBudgetRange: z.string().describe("Fourchette de budget en euros"),
  questions: z.array(z.string()).describe("Questions de clarification pour affiner l'estimation"),
})

export type ProjectAnalysis = z.infer<typeof projectAnalysisSchema>

export async function analyzeProject(description: string, selectedModules: string[]) {
  const result = await generateObject({
    model: models.fast,
    schema: projectAnalysisSchema,
    prompt: `Analyse cette description de projet et les modules sélectionnés pour une agence digitale.

Description du client : "${description}"
Modules sélectionnés : ${selectedModules.join(", ") || "aucun"}

Basé sur ces informations, estime :
- Les services les plus pertinents parmi : Site Vitrine, E-commerce, Application Web, Branding, SEO/Stratégie
- La complexité du projet
- Le délai en semaines
- La fourchette de budget (en euros)
- 2-3 questions de clarification pertinentes

Référence de prix :
- Site vitrine simple : 2 500-4 000€, 4-6 semaines
- Site vitrine avancé : 4 000-7 000€, 6-10 semaines
- E-commerce simple : 5 000-8 000€, 8-10 semaines
- E-commerce avancé : 8 000-15 000€, 10-14 semaines
- Application web : 8 000-30 000€+, 10-20 semaines
- Branding : 1 500-4 000€, 3-6 semaines`,
  })

  return result.object
}
