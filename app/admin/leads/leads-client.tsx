"use client"

import { useState } from "react"
import { CraftCard } from "@/components/ui/craft-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { Lead } from "@/lib/db/types"

const statusFilters = ["Tous", "new", "contacted", "qualified", "converted", "archived"] as const
const statusLabels: Record<string, string> = {
  Tous: "Tous",
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
  converted: "Converti",
  archived: "Archivé",
}

export function LeadsClient({ leads, isConnected }: { leads: Lead[]; isConnected: boolean }) {
  const [activeFilter, setActiveFilter] = useState<string>("Tous")
  const [search, setSearch] = useState("")

  const filtered = leads.filter((lead) => {
    const matchesStatus = activeFilter === "Tous" || lead.status === activeFilter
    const matchesSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company?.toLowerCase().includes(search.toLowerCase()) ?? false)
    return matchesStatus && matchesSearch
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">Gestion et scoring des leads.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {statusFilters.map((filter) => (
          <Button
            key={filter}
            variant={filter === activeFilter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={
              filter === activeFilter
                ? "bg-amber hover:bg-amber-deep text-white rounded-full"
                : "rounded-full"
            }
          >
            {statusLabels[filter]}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 text-sm bg-card border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/30"
            />
          </div>
        </div>
      </div>

      {/* Leads table */}
      <CraftCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        {lead.company && <p className="text-xs text-muted-foreground">{lead.company}</p>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{lead.email}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber/10 text-amber font-medium">
                        {lead.score}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground capitalize">{lead.source}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs capitalize">{statusLabels[lead.status] ?? lead.status}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <p className="text-lg mb-2">
                      {isConnected ? "Aucun lead pour le moment" : "Aucun lead pour le moment"}
                    </p>
                    <p className="text-sm">
                      {isConnected
                        ? "Les leads des formulaires et du chatbot apparaîtront ici."
                        : "Les leads apparaîtront ici une fois Supabase connecté."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CraftCard>
    </div>
  )
}
