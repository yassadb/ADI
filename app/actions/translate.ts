"use server"

import { generateText } from "ai"
import { models } from "@/lib/ai/models"

export async function translateText(
  text: string,
  targetLang: "fr" | "en" | "ar" | "nl"
) {
  const langNames = {
    fr: "français",
    en: "anglais",
    ar: "arabe",
    nl: "néerlandais",
  }

  const result = await generateText({
    model: models.fast,
    prompt: `Traduis le texte suivant en ${langNames[targetLang]}. Retourne UNIQUEMENT la traduction, sans explication ni commentaire.

Texte : "${text}"`,
  })

  return result.text
}
