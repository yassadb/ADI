import { CraftCard } from "@/components/ui/craft-card"
import { BarChart3, Users, MessageCircle, MousePointerClick, Clock } from "lucide-react"
import { createSupabaseAdmin } from "@/lib/db/server"

async function getAnalyticsData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }

  try {
    const supabase = await createSupabaseAdmin()

    const [pageViewsRes, sessionsRes, chatRes, ctaRes] = await Promise.all([
      supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "page_view"),
      supabase.from("analytics_events").select("session_id").eq("event_type", "page_view"),
      supabase.from("conversations").select("*", { count: "exact", head: true }),
      supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "cta_click"),
    ])

    const uniqueSessions = new Set((sessionsRes.data ?? []).map((e) => e.session_id)).size

    return {
      pageViews: pageViewsRes.count ?? 0,
      uniqueVisitors: uniqueSessions,
      chatConversations: chatRes.count ?? 0,
      ctaClicks: ctaRes.count ?? 0,
    }
  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return null
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  const metrics = [
    { label: "Pages vues", value: data ? String(data.pageViews) : "—", icon: BarChart3 },
    { label: "Visiteurs uniques", value: data ? String(data.uniqueVisitors) : "—", icon: Users },
    { label: "Conversations chat", value: data ? String(data.chatConversations) : "—", icon: MessageCircle },
    { label: "Clics CTA", value: data ? String(data.ctaClicks) : "—", icon: MousePointerClick },
    { label: "Temps moyen", value: "—", icon: Clock },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Suivez les performances de votre site et de vos conversions.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {metrics.map((m) => (
          <CraftCard key={m.label}>
            <div className="flex items-center gap-3">
              <m.icon className="h-5 w-5 text-amber" />
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-xl font-bold text-foreground">{m.value}</p>
              </div>
            </div>
          </CraftCard>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Trafic</h3>
          <div className="h-64 border border-dashed border-border/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            {data ? "Graphique de trafic (recharts) — Disponible prochainement" : "Graphique de trafic (recharts) — En attente de données"}
          </div>
        </CraftCard>

        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Funnel de Conversion</h3>
          <div className="space-y-3">
            {[
              { label: "Visiteurs", width: data ? "100%" : "100%", count: data ? String(data.uniqueVisitors) : "—" },
              { label: "Conversations chat", width: data && data.uniqueVisitors > 0 ? `${Math.round((data.chatConversations / data.uniqueVisitors) * 100)}%` : "60%", count: data ? String(data.chatConversations) : "—" },
              { label: "Leads qualifiés", width: "35%", count: "—" },
              { label: "Devis générés", width: "20%", count: "—" },
              { label: "Clients convertis", width: "10%", count: "—" },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-36 text-right">{step.label}</span>
                <div className="flex-1 h-8 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber to-amber-deep rounded-full flex items-center justify-end pr-3"
                    style={{ width: step.width }}
                  >
                    <span className="text-xs font-medium text-white">{step.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CraftCard>
      </div>
    </div>
  )
}
