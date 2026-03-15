"use client"

import { Users, MessageCircle, FileText, TrendingUp } from "lucide-react"
import { CraftCard } from "@/components/ui/craft-card"

const stats = [
  { label: "Leads ce mois", value: "—", icon: Users, color: "text-amber" },
  { label: "Conversations", value: "—", icon: MessageCircle, color: "text-indigo" },
  { label: "Devis générés", value: "—", icon: FileText, color: "text-emerald" },
  { label: "Taux de conversion", value: "—", icon: TrendingUp, color: "text-terracotta" },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de votre activité digitale.</p>
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

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Derniers Leads</h3>
          <p className="text-sm text-muted-foreground">
            Connectez Supabase pour voir les leads en temps réel.
          </p>
          <div className="mt-4 p-8 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground text-sm">
            En attente de connexion à la base de données
          </div>
        </CraftCard>

        <CraftCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Conversations Récentes</h3>
          <p className="text-sm text-muted-foreground">
            Les conversations du chatbot IA apparaîtront ici.
          </p>
          <div className="mt-4 p-8 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground text-sm">
            En attente de connexion à la base de données
          </div>
        </CraftCard>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
