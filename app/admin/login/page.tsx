"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CraftCard } from "@/components/ui/craft-card"
import { Button } from "@/components/ui/button"
import { GeoPattern } from "@/components/ui/geo-pattern"
import { Lock, Loader2 } from "lucide-react"

function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/admin"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push(redirect)
        router.refresh()
      } else {
        setError("Mot de passe incorrect")
      }
    } catch {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <CraftCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe admin"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/40"
              autoFocus
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-amber hover:bg-amber-deep text-white rounded-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </CraftCard>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <GeoPattern variant="star-8" size={48} color="hsl(var(--amber))" opacity={0.7} animate={false} />
          <h1 className="text-2xl font-bold text-foreground mt-4">ADI Admin</h1>
          <p className="text-muted-foreground text-sm mt-1">Accès réservé</p>
        </div>

        <Suspense fallback={
          <CraftCard>
            <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
              Chargement...
            </div>
          </CraftCard>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
