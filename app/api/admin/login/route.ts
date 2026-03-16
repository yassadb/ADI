import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const adminSecret = process.env.ADMIN_SECRET

    if (!adminSecret) {
      return NextResponse.json({ error: "ADMIN_SECRET not configured" }, { status: 500 })
    }

    if (password !== adminSecret) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set("admin-token", adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
