"use server"

import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { models } from "@/lib/ai/models"
import { CHAT_SYSTEM_PROMPT } from "@/lib/ai/prompts"
import { getKnowledgeBase } from "@/lib/ai/knowledge-base"

export async function chat(messages: UIMessage[]) {
  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: models.chat,
    system: `${CHAT_SYSTEM_PROMPT}\n\n${getKnowledgeBase()}`,
    messages: modelMessages,
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  return result.toUIMessageStreamResponse()
}
