"use client"

import { Mail, Phone, MapPin, Info, Linkedin } from "lucide-react"
import Link from "next/link"

export default function ContactInfoSection() {
  return (
    <div className="bg-card p-8 sm:p-10 rounded-2xl shadow-2xl h-full flex flex-col">
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Nos Coordonnées.</h3>
      <div className="space-y-6 text-muted-foreground flex-grow">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-brand-blue mr-4 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-foreground">Atlas Digital Impact</p>
            <p>Boulevard du Jubilé</p>
            <p>1080 Bruxelles, Belgique</p>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-brand-blue mr-4 flex-shrink-0" />
          <a href="mailto:contact@atlas-digital-impact.com" className="hover:text-brand-blue transition-colors">
            contact@atlas-digital-impact.com
          </a>
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-brand-blue mr-4 flex-shrink-0" />
          <span>+32 2 XXX XX XX (BE)</span> {/* Placeholder */}
        </div>
        <div className="flex items-center">
          <Info className="h-5 w-5 text-brand-blue mr-4 flex-shrink-0" />
          <span>OULADIB SRL : BE0768.657.593</span>
        </div>
        <div className="flex items-center">
          <Linkedin className="h-5 w-5 text-brand-blue mr-4 flex-shrink-0" />
          <Link href="#" className="hover:text-brand-blue transition-colors">
            Suivez-nous sur LinkedIn
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="text-lg font-semibold text-foreground mb-4">Nous Localiser :</h4>
        <div className="aspect-video rounded-xl overflow-hidden border border-border/50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.6069596699954!2d4.330588015609989!3d50.85711997953358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3f5f5f5f5f5%3A0x47c3c3f5f5f5f5f5!2sBoulevard%20du%20Jubil%C3%A9%2C%201080%20Molenbeek-Saint-Jean%2C%20Belgium!5e0!3m2!1sen!2sbe!4v1620000000000!5m2!1sen!2sbe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte Google Maps - Boulevard du Jubilé, Bruxelles"
            className="filter dark:invert dark:grayscale"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
