import { Users, MessageCircle, FileText, TrendingUp } from "lucide-react"
import { CraftCard } from "@/components/ui/craft-card"
import { createSupabaseAdmin } from "@/lib/db/server"
import type { Lead, Conversation } from "@/lib/db/types"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

async function getDashboardData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }

  try {
    const supabase = await createSupabaseAdmin()
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const [leadsRes, conversationsRes, quotesRes, convertedRes, recentLeadsRes, recentConversationsRes] = await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", startOfMonth),
      supabase.from("conversations").select("*", { count: "exact", head: true }),
      supabase.from("quotes").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "converted"),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("conversations").select("*").order("created_at", { ascending: false }).limit(5),
    ])

    const totalLeads = leadsRes.count ?? 0
    const totalConversations = conversationsRes.count ?? 0
    const totalQuotes = quotesRes.count ?? 0
    const totalConverted = convertedRes.count ?? 0
    const allLeadsCount = (await supabase.from("leads").select("*", { count: "exact", head: true })).count ?? 0
    const conversionRate = allLeadsCount > 0 ? Math.round((totalConverted / allLeadsCount) * 100) : 0

    return {
      leadsThisMonth: totalLeads,
      conversations: totalConversations,
      quotes: totalQuotes,
      conversionRate,
      recentLeads: (recentLeadsRes.data ?? []) as Lead[],
      recentConversations: (recentConversationsRes.data ?? []) as Conversation[],
    }
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
    return null
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData()

  const stats = [
    { label: "Leads ce mois", value: data ? String(data.leadsThisMonth) : "—", icon: Users, color: "text-amber" },
    { label: "Conversations", value: data ? String(data.conversations) : "—", icon: MessageCircle, color: "text-indigo" },
    { label: "Devis générés", value: data ? String(data.quotes) : "—", icon: FileText, color: "text-emerald" },
    { label: "Taux de conversion", value: data ? `${data.conversionRate}%` : "—", icon: TrendingUp, color: "text-terracotta" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Vue d&apos;ensemble de votre activité digitale.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <CraftCard key={stat.label} variant="bordered">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-lg bg-card", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </CraftCard>
        ))}
      </div>

      {/* Recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Derniers Leads</h3>
          {data && data.recentLeads.length > 0 ? (
            <div className="space-y-3">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber/10 text-amber font-medium">
                      {lead.score}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">{lead.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {data ? "Aucun lead pour le moment." : "Connectez Supabase pour voir les leads en temps réel."}
              </p>
              <div className="mt-4 p-8 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground text-sm">
                {data ? "Les leads apparaîtront ici" : "En attente de connexion à la base de données"}
              </div>
            </>
          )}
        </CraftCard>

        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Conversations Récentes</h3>
          {data && data.recentConversations.length > 0 ? (
            <div className="space-y-3">
              {data.recentConversations.map((conv) => (
                <div key={conv.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {conv.summary || `Conversation (${conv.messages.length} messages)`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(conv.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo/10 text-indigo font-medium">
                    {conv.messages.length} msg
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {data ? "Aucune conversation pour le moment." : "Les conversations du chatbot IA apparaîtront ici."}
              </p>
              <div className="mt-4 p-8 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground text-sm">
                {data ? "Les conversations apparaîtront ici" : "En attente de connexion à la base de données"}
              </div>
            </>
          )}
        </CraftCard>
      </div>
    </div>
  )
}
