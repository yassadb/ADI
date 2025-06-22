"use client"

import Header from "../../header"
import Footer from "../../footer"
import ContactHeroSection from "./components/contact-hero-section"
import ContactFormSection from "./components/contact-form-section"
import ContactInfoSection from "./components/contact-info-section"
// Note: global layout already has sonner Toaster, so this might be redundant if form uses sonner

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ContactHeroSection />
        <div className="bg-secondary/30 py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3 animate-fade-in-up">
                <ContactFormSection />
              </div>
              <div className="lg:col-span-2 animate-fade-in-up animate-delay-200">
                <ContactInfoSection />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Toaster /> Only if ContactFormSection uses the old useToast hook. Prefer global sonner. */}
      <Footer />
    </div>
  )
}
