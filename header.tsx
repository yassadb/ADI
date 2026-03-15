"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigationItems = [
  { name: "Accueil", href: "/" },
  { name: "Notre Agence", href: "/agence" },
  { name: "Services", href: "/services" },
  { name: "Notre Approche", href: "/approche" },
  { name: "Réalisations", href: "/realisations" },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-background/95 backdrop-blur-md",
        isScrolled && "border-b border-border/50 shadow-sm",
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src="/logo.png" alt="Atlas Digital Impact Logo" width={120} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-amber rounded-md"
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-4 bg-amber hover:bg-amber-deep text-white rounded-full px-6"
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-foreground hover:bg-amber/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-xl animate-fade-in-up duration-300 border-b border-border/50">
          <div className="container mx-auto py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-amber hover:bg-amber/5 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="w-full mt-2 bg-amber hover:bg-amber-deep text-white rounded-full py-3"
            >
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
