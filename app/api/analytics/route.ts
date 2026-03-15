import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { events } = body

    if (!events || !Array.isArray(events)) {
      return NextResponse.json({ error: "Invalid events format" }, { status: 400 })
    }

    // TODO: Save to Supabase when connected
    // const supabase = createSupabaseAdmin()
    // await supabase.from("analytics_events").insert(events)

    return NextResponse.json({ success: true, count: events.length })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
