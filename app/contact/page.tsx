"use client"

import { useState } from "react"
import Header from "../../header"
import Footer from "../../footer"
import ContactHeroSection from "./components/contact-hero-section"
import ContactFormSection from "./components/contact-form-section"
import ContactInfoSection from "./components/contact-info-section"
import { ProjectConfigurator } from "@/components/ai/project-configurator"
import { cn } from "@/lib/utils"
import { Wand2, Mail } from "lucide-react"

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"configurator" | "form">("configurator")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ContactHeroSection />
        <div className="bg-card/50 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                {/* Tab switcher */}
                <div className="flex gap-2 mb-8">
                  <button
                    onClick={() => setActiveTab("configurator")}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                      activeTab === "configurator"
                        ? "bg-amber text-white shadow-sm"
                        : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Wand2 className="h-4 w-4" />
                    Configurateur IA
                  </button>
                  <button
                    onClick={() => setActiveTab("form")}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                      activeTab === "form"
                        ? "bg-amber text-white shadow-sm"
                        : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Mail className="h-4 w-4" />
                    Formulaire classique
                  </button>
                </div>

                {/* Tab content */}
                {activeTab === "configurator" ? (
                  <div className="bg-card p-8 sm:p-10 rounded-2xl shadow-2xl">
                    <ProjectConfigurator />
                  </div>
                ) : (
                  <ContactFormSection />
                )}
              </div>
              <div className="lg:col-span-2">
                <ContactInfoSection />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
