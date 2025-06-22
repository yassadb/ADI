import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "@/components/utils/scroll-to-top" // Import the new component

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Atlas Digital Impact - Modern Digital Solutions",
  description:
    "Elevating Moroccan businesses with cutting-edge digital experiences. Inspired by modern design principles.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Setting dark theme as default
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop /> {/* Add the ScrollToTop component here */}
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
