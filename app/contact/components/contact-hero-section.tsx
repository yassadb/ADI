"use client"

import { MessageSquare } from "lucide-react"

export default function ContactHeroSection() {
  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Unified Background */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/modern-abstract-blue.png')" }}
      />
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground)) 1px, hsl(var(--background)) 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-accent/10 text-accent rounded-full text-sm font-medium animate-fade-in animate-delay-100">
            <MessageSquare className="inline-block h-4 w-4 mr-1.5" />
            Parlons de Vous
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 animate-fade-in-up">
            Contactez <span className="text-brand-blue">Atlas Digital Impact</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Que vous ayez un projet précis, une question, ou que vous souhaitiez simplement explorer comment nous
            pouvons aider votre entreprise à prospérer au Maroc, notre équipe est à votre écoute.
          </p>
        </div>
      </div>
    </section>
  )
}
