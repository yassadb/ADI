"use client"

import { CraftCard } from "@/components/ui/craft-card"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

const statusFilters = ["Tous", "Nouveau", "Contacté", "Qualifié", "Converti", "Archivé"]

export default function LeadsPage() {
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
            variant={filter === "Tous" ? "default" : "outline"}
            size="sm"
            className={
              filter === "Tous"
                ? "bg-amber hover:bg-amber-deep text-white rounded-full"
                : "rounded-full"
            }
          >
            {filter}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 text-sm bg-card border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/30"
            />
          </div>
        </div>
      </div>

      {/* Leads table placeholder */}
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
              <tr>
                <td colSpan={6} className="py-16 text-center text-muted-foreground">
                  <p className="text-lg mb-2">Aucun lead pour le moment</p>
                  <p className="text-sm">Les leads des formulaires et du chatbot apparaîtront ici une fois Supabase connecté.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CraftCard>
    </div>
  )
}
