import Link from "next/link"
import Header from "../../../header"
import Footer from "../../../footer"
import { ArrowLeft } from "lucide-react"
import { GeoPattern } from "@/components/ui/geo-pattern"

// Static content — will be replaced by Supabase data
const postsContent: Record<string, { title: string; content: string; date: string; tags: string[] }> = {
  "transformer-presence-digitale-2026": {
    title: "Comment Transformer Votre Présence Digitale en 2026",
    content: `La transformation digitale n'est plus une option — c'est une nécessité. En 2026, les entreprises qui n'ont pas encore embrassé le digital risquent de se retrouver à la traîne.

Chez Atlas Digital Impact, nous accompagnons les entreprises belges et marocaines dans cette transformation avec une approche artisanale et sur mesure.

## Les Tendances Clés

1. **L'IA conversationnelle** : Les chatbots intelligents augmentent les taux de conversion de 3 à 5 fois.
2. **Le design mobile-first** : Plus de 70% du trafic web vient du mobile.
3. **La personnalisation** : Les utilisateurs attendent une expérience adaptée à leurs besoins.

## Notre Approche

Nous croyons en un digital qui a du sens. Pas de solutions génériques — chaque projet est unique, comme l'artisan qui le façonne.

Contactez-nous pour discuter de votre transformation digitale.`,
    date: "2026-03-15",
    tags: ["Stratégie", "Digital", "Tendances"],
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postsContent[slug]

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article non trouvé</h1>
            <Link href="/blog" className="text-amber hover:text-amber-deep transition-colors">
              &larr; Retour au blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Article header */}
        <section className="relative py-16 sm:py-24 bg-background overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03]">
            <GeoPattern variant="rosette" size={300} animate={false} />
          </div>
          <div className="container mx-auto max-w-3xl relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-amber/10 text-amber text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-muted-foreground">
              {new Date(post.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Article content */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                if (paragraph.includes("**")) {
                  return (
                    <div key={i} className="text-muted-foreground leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>")
                          .replace(/^\d+\.\s/gm, "")
                          .split("\n")
                          .join("<br />"),
                      }}
                    />
                  )
                }
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
