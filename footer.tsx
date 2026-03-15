"use client"

import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"
import { GeoPattern } from "@/components/ui/geo-pattern"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Services", href: "/services" },
        { name: "Notre Agence", href: "/agence" },
        { name: "Notre Approche", href: "/approche" },
        { name: "Réalisations", href: "/realisations" },
      ],
    },
    {
      title: "Informations",
      links: [
        { name: "Mentions Légales", href: "/mentions-legales" },
        { name: "Politique de Confidentialité", href: "/politique-de-confidentialite" },
        { name: "Contactez-nous", href: "/contact" },
      ],
    },
  ]

  return (
    <footer className="bg-background border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber/3 to-transparent pointer-events-none" />
      <div className="container mx-auto py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <GeoPattern variant="star-8" size={32} color="hsl(var(--amber))" opacity={0.7} animate={false} />
              <span className="text-2xl font-bold text-foreground">Atlas Digital Impact</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Expertise digitale locale en Belgique, impact au Maroc. Nous façonnons le digital
              avec la précision d'un artisan.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber mr-3 flex-shrink-0" />
                <a href="mailto:contact@atlas-digital-impact.com" className="hover:text-amber transition-colors">
                  contact@atlas-digital-impact.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Legal */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-md font-semibold text-foreground mb-5">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-amber transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Atlas Digital Impact (OULADIB SRL : BE0768.657.593). Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="#"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-amber transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
