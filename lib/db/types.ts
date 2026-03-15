export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  source: "form" | "chat" | "configurator" | "quote"
  score: number
  status: "new" | "contacted" | "qualified" | "converted" | "archived"
  metadata?: Record<string, unknown>
  created_at: string
}

export interface Conversation {
  id: string
  lead_id?: string
  messages: ConversationMessage[]
  summary?: string
  created_at: string
  updated_at: string
}

export interface ConversationMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface AnalyticsEvent {
  id: string
  event_type: string
  page: string
  metadata?: Record<string, unknown>
  session_id: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  meta_description?: string
  status: "draft" | "published" | "archived"
  tags?: string[]
  created_at: string
  published_at?: string
}

export interface Quote {
  id: string
  lead_id?: string
  conversation_id?: string
  project_type: string
  requirements: Record<string, unknown>
  estimated_budget: string
  estimated_timeline: string
  created_at: string
}
