"use server"

import { streamText } from "ai"
import { models } from "@/lib/ai/models"
import { CONTENT_SYSTEM_PROMPT } from "@/lib/ai/prompts"

export async function generateContent(
  type: "blog" | "proposal" | "email" | "social",
  prompt: string,
  tone: "professionnel" | "décontracté" | "technique" = "professionnel"
) {
  const typeInstructions = {
    blog: "Rédige un article de blog SEO-optimisé (800-1500 mots) avec structure H2/H3, meta description, et tags.",
    proposal: "Rédige une proposition commerciale structurée avec introduction, services proposés, timeline, budget et conclusion.",
    email: "Rédige un email de suivi court et percutant (max 200 mots) avec objet, corps et appel à l'action.",
    social: "Rédige un post pour les réseaux sociaux (LinkedIn/Instagram) avec hashtags pertinents.",
  }

  const result = streamText({
    model: models.content,
    system: CONTENT_SYSTEM_PROMPT,
    prompt: `Type de contenu : ${typeInstructions[type]}
Ton : ${tone}
Sujet/Brief : ${prompt}`,
  })

  return result.toDataStream()
}
