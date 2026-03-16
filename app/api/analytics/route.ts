import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdmin } from "@/lib/db/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { events } = body

    if (!events || !Array.isArray(events)) {
      return NextResponse.json({ error: "Invalid events format" }, { status: 400 })
    }

    // Persist to Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = await createSupabaseAdmin()
        await supabase.from("analytics_events").insert(events)
      } catch (dbError) {
        console.error("Failed to persist analytics to Supabase:", dbError)
      }
    }

    return NextResponse.json({ success: true, count: events.length })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
