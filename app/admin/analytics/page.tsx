"use client"

import { CraftCard } from "@/components/ui/craft-card"
import { BarChart3, Users, MessageCircle, MousePointerClick, Clock } from "lucide-react"

const metrics = [
  { label: "Pages vues", value: "—", icon: BarChart3, change: "" },
  { label: "Visiteurs uniques", value: "—", icon: Users, change: "" },
  { label: "Conversations chat", value: "—", icon: MessageCircle, change: "" },
  { label: "Clics CTA", value: "—", icon: MousePointerClick, change: "" },
  { label: "Temps moyen", value: "—", icon: Clock, change: "" },
]

export default function AnalyticsPage() {
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
            Graphique de trafic (recharts) — En attente de données
          </div>
        </CraftCard>

        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Funnel de Conversion</h3>
          <div className="space-y-3">
            {[
              { label: "Visiteurs", width: "100%", count: "—" },
              { label: "Conversations chat", width: "60%", count: "—" },
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
