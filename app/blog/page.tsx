import Link from "next/link"
import Header from "../../header"
import Footer from "../../footer"
import { GeoPattern } from "@/components/ui/geo-pattern"

// Static placeholder posts — will be replaced by Supabase data
const posts = [
  {
    slug: "transformer-presence-digitale-2026",
    title: "Comment Transformer Votre Présence Digitale en 2026",
    excerpt: "Les tendances et stratégies clés pour une transformation digitale réussie au Maroc et en Belgique.",
    tags: ["Stratégie", "Digital", "Tendances"],
    date: "2026-03-15",
  },
  {
    slug: "e-commerce-maroc-belgique",
    title: "E-commerce : Opportunités entre le Maroc et la Belgique",
    excerpt: "Explorez les opportunités de commerce en ligne entre les deux marchés et comment en tirer parti.",
    tags: ["E-commerce", "Maroc", "Belgique"],
    date: "2026-03-10",
  },
  {
    slug: "ia-agence-digitale",
    title: "L'IA au Service de Votre Agence Digitale",
    excerpt: "Comment l'intelligence artificielle révolutionne la création de sites web et le marketing digital.",
    tags: ["IA", "Innovation", "Marketing"],
    date: "2026-03-05",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-20 sm:py-28 bg-background overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
            <GeoPattern variant="rosette" size={400} animate={false} />
          </div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Notre <span className="text-amber">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tendances et conseils pour réussir votre transformation digitale.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-card rounded-xl border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber/5 h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-amber/10 to-indigo/10 flex items-center justify-center">
                      <GeoPattern variant="tessellation" size={120} color="hsl(var(--amber))" opacity={0.15} animate={false} />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full bg-amber/10 text-amber text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-amber transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground flex-1">{post.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-4">
                        {new Date(post.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
