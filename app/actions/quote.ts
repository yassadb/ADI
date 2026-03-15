"use server"

import { generateObject } from "ai"
import { z } from "zod"
import { models } from "@/lib/ai/models"
import { QUOTE_SYSTEM_PROMPT } from "@/lib/ai/prompts"

const quoteSchema = z.object({
  projectType: z.string().describe("Type de projet identifié"),
  breakdown: z.array(
    z.object({
      item: z.string().describe("Poste de travail"),
      description: z.string().describe("Description courte"),
      estimatedCost: z.string().describe("Coût estimé en euros"),
    })
  ).describe("Ventilation détaillée du devis"),
  totalEstimate: z.string().describe("Fourchette totale estimée en euros"),
  timeline: z.string().describe("Délai de réalisation estimé"),
  notes: z.array(z.string()).describe("Notes et conditions importantes"),
})

export type QuoteEstimate = z.infer<typeof quoteSchema>

export async function generateQuote(data: {
  description: string
  selectedModules: string[]
  budget?: string
  deadline?: string
}) {
  const result = await generateObject({
    model: models.fast,
    schema: quoteSchema,
    system: QUOTE_SYSTEM_PROMPT,
    prompt: `Génère un devis estimatif pour ce projet :

Description : "${data.description}"
Modules sélectionnés : ${data.selectedModules.join(", ") || "aucun"}
Budget client : ${data.budget || "Non spécifié"}
Délai souhaité : ${data.deadline || "Non spécifié"}

Référence de prix :
- Site vitrine simple : 2 500-4 000€, 4-6 semaines
- Site vitrine avancé : 4 000-7 000€, 6-10 semaines
- E-commerce simple : 5 000-8 000€, 8-10 semaines
- E-commerce avancé : 8 000-15 000€, 10-14 semaines
- Application web : 8 000-30 000€+, 10-20 semaines
- Branding complet : 1 500-4 000€, 3-6 semaines
- SEO / Stratégie : 1 000-3 000€, continu`,
  })

  return result.object
}
