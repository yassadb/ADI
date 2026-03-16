import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next()
  }

  // Skip protection if ADMIN_SECRET is not configured (dev mode)
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    return NextResponse.next()
  }

  // Check for admin-token cookie
  const token = request.cookies.get("admin-token")?.value
  if (token === adminSecret) {
    return NextResponse.next()
  }

  // Redirect to login
  const loginUrl = new URL("/admin/login", request.url)
  loginUrl.searchParams.set("redirect", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}
