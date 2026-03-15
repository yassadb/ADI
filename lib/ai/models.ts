import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"

export const models = {
  /** Conversations complexes, devis, analyse — Claude Sonnet 4.6 */
  chat: anthropic("claude-sonnet-4-6"),

  /** Scoring, classification, tâches simples — Claude Haiku 4.5 (rapide, pas cher) */
  fast: anthropic("claude-haiku-4-5-20251001"),

  /** Fallback / alternative — GPT-4o-mini */
  fallback: openai("gpt-4o-mini"),

  /** Génération de contenu long (blog, propositions) — Claude Sonnet 4.6 */
  content: anthropic("claude-sonnet-4-6"),
}
