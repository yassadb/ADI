"use server"

import { generateObject } from "ai"
import { z } from "zod"
import { models } from "@/lib/ai/models"
import { SCORE_SYSTEM_PROMPT } from "@/lib/ai/prompts"

const leadScoreSchema = z.object({
  score: z.number().min(0).max(100).describe("Score du lead de 0 à 100"),
  reasoning: z.string().describe("Explication courte du score"),
  suggestedAction: z.enum(["contact_urgent", "nurture", "follow_up", "archive"]).describe("Action recommandée"),
  tags: z.array(z.string()).describe("Tags de catégorisation"),
})

export type LeadScore = z.infer<typeof leadScoreSchema>

export async function scoreLead(leadData: {
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  source: string
  chatMessages?: number
}) {
  const result = await generateObject({
    model: models.fast,
    schema: leadScoreSchema,
    system: SCORE_SYSTEM_PROMPT,
    prompt: `Analyse ce lead et attribue un score :

Nom : ${leadData.name}
Email : ${leadData.email}
Entreprise : ${leadData.company || "Non renseigné"}
Téléphone : ${leadData.phone || "Non renseigné"}
Sujet : ${leadData.subject || "Non spécifié"}
Message : "${leadData.message}"
Source : ${leadData.source}
Messages chat : ${leadData.chatMessages || 0}`,
  })

  return result.object
}
