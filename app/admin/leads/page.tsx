import { createSupabaseAdmin } from "@/lib/db/server"
import type { Lead } from "@/lib/db/types"
import { LeadsClient } from "./leads-client"

async function getLeads(): Promise<Lead[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return []
  }

  try {
    const supabase = await createSupabaseAdmin()
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) throw error
    return (data ?? []) as Lead[]
  } catch (error) {
    console.error("Failed to fetch leads:", error)
    return []
  }
}

export default async function LeadsPage() {
  const leads = await getLeads()
  const isConnected = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  return <LeadsClient leads={leads} isConnected={isConnected} />
}
