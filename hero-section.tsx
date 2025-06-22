"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Zap } from "lucide-react"

export default function HeroSection() {
  // Define button styles with more matte, sober green
  const greenButtonStyle = {
    background: "linear-gradient(to right, #065f46, #064e3b)", // More matte, sober forest green
    color: "white",
    borderRadius: "9999px",
    fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "none",
  }

  const blueButtonStyle = {
    background: "linear-gradient(to right, #3b82f6, #2563eb)", // Matching the brand blue from the screenshot
    color: "white",
    borderRadius: "9999px",
    fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "none",
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Enhanced Background Glow */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50 dark:opacity-30 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground)) 1px, hsl(var(--background)) 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center py-20 md:py-32">
          <div className="inline-block px-4 py-1.5 mb-6 bg-accent/10 text-accent rounded-full text-sm font-medium animate-fade-in animate-delay-100">
            <Zap className="inline-block h-4 w-4 mr-1.5" />
            Transformer le Digital Marocain
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl mb-8 animate-fade-in-up">
            Façonnez l'Avenir Numérique avec{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-sky-400">
              Atlas Digital Impact
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
            Nous fusionnons une expertise de pointe avec une vision créative pour propulser votre entreprise marocaine
            vers de nouveaux sommets digitaux.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 animate-fade-in-up animate-delay-300">
            <Link
              href="/realisations"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm transition-all duration-300 transform hover:scale-105"
              style={greenButtonStyle}
            >
              Nos réalisations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm transition-all duration-300 transform hover:scale-105"
              style={blueButtonStyle}
            >
              Planifier une Consultation
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm animate-fade-in-up animate-delay-500">
            {["Design Innovant", "Stratégie Axée Résultats", "Technologie de Pointe"].map((item, index) => (
              <div key={index} className="flex items-center text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-brand-blue mr-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
