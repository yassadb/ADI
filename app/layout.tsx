import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "@/components/utils/scroll-to-top"
import { LenisProvider } from "@/components/ui/lenis-provider"

export const metadata: Metadata = {
  title: "Atlas Digital Impact — Digital Craftsmanship",
  description:
    "Expertise digitale locale en Belgique, impact au Maroc. Sites web, e-commerce, applications et branding avec la précision d'un artisan.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <ScrollToTop />
            {children}
            <Toaster richColors position="top-right" />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
