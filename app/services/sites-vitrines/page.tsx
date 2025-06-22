"use client"

import Header from "../../../header"
import Footer from "../../../footer"

import ServiceHeroSection from "./components/service-hero-section"
import TargetAudienceSection from "./components/target-audience-section"
import KeyBenefitsSection from "./components/key-benefits-section"
import ServiceFeaturesSection from "./components/service-features-section"
import ShowcaseSection from "./components/showcase-section"
import ServiceCtaSection from "./components/service-cta-section"

export default function SitesVitrinesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ServiceHeroSection
          badge="Sites Vitrines"
          title="Sites Vitrines Modernes et Performants."
          paragraph="Votre site vitrine est la pierre angulaire de votre présence digitale au Maroc. Nous concevons des sites web esthétiques, professionnels et optimisés pour convertir vos visiteurs en clients fidèles."
          imageSrc="/images/service-hero-sites-vitrines-dark.png"
          imageAlt="Sites Vitrines"
        />
        <TargetAudienceSection
          title="Ce service est idéal pour..."
          description=""
          targetAudiences={[
            "Les PME et TPE marocaines souhaitant renforcer leur image de marque et leur crédibilité en ligne.",
            "Les professionnels libéraux (avocats, médecins, consultants...) désirant une présence web de qualité pour présenter leur expertise.",
            "Les artisans et commerçants voulant exposer leurs produits ou services à une audience plus large.",
            "Toute entreprise ou organisation visant à générer des prospects qualifiés et à faciliter la prise de contact via le web.",
          ]}
        />
        <KeyBenefitsSection
          title="Bénéfices Clés pour Votre Entreprise"
          benefits={[
            {
              icon: "BadgeCheck",
              title: "Crédibilité et Image de Marque Renforcées",
              description:
                "Un site professionnel inspire confiance et positionne votre entreprise comme un acteur sérieux sur le marché marocain.",
            },
            {
              icon: "TrendingUp",
              title: "Visibilité Accrue 24/7",
              description:
                "Soyez accessible à tout moment par vos clients potentiels, où qu'ils soient au Maroc et au-delà.",
            },
            {
              icon: "Users",
              title: "Génération d'Opportunités Commerciales",
              description:
                "Transformez les visiteurs en prospects grâce à un design engageant et des appels à l'action clairs.",
            },
            {
              icon: "MessageCircle",
              title: "Communication Efficace sur Vos Offres",
              description: "Présentez clairement vos produits, services et valeurs ajoutées à votre audience cible.",
            },
          ]}
        />
        <ServiceFeaturesSection
          title="Nos Prestations Incluses"
          features={[
            {
              icon: "Palette",
              title: "Design Personnalisé et Unique",
              description:
                "Nous créons une identité visuelle sur mesure qui reflète votre marque et séduit votre public.",
            },
            {
              icon: "Smartphone",
              title: "Développement Responsive",
              description: "Une expérience utilisateur optimale sur tous les appareils, essentielle au Maroc.",
            },
            {
              icon: "Search",
              title: "Optimisation SEO Initiale",
              description: "Les bases techniques pour améliorer votre référencement naturel sur Google et autres.",
            },
            {
              icon: "Settings2",
              title: "Gestion de Contenu Facilitée (CMS)",
              description: "Mettez à jour votre site facilement (actualités, blog...) si vous optez pour un CMS.",
            },
            {
              icon: "Lightbulb",
              title: "Conseils Stratégiques",
              description: "Nous vous guidons à chaque étape, de la conception à la mise en ligne et au-delà.",
            },
            {
              icon: "ShieldCheck",
              title: "Sécurité et Maintenance",
              description: "Nous veillons à la robustesse et à la protection de votre investissement digital.",
            },
          ]}
        />
        <ShowcaseSection
          title="Quelques Concepts Visuels"
          description=""
          images={[
            "/images/showcase-sites-vitrines-1-dark.png",
            "/images/showcase-sites-vitrines-2-dark.png",
            "/images/showcase-sites-vitrines-3-dark.png",
          ]}
        />
        <ServiceCtaSection
          title="Prêt à créer un site vitrine qui marque les esprits ?"
          paragraph=""
          buttonText="Obtenir un devis personnalisé"
          buttonLink="/contact?service=site-vitrine"
        />
      </main>
      <Footer />
    </div>
  )
}
