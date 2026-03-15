# Atlas Digital Impact — Development Guide

## Build & Run

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm tsc --noEmit     # Type check
```

## Project Structure

```
app/
├── page.tsx                 # Homepage (scrollytelling)
├── layout.tsx               # Root layout (ThemeProvider, Lenis, ChatWidget)
├── actions/                 # AI Server Actions (AI SDK 6)
│   ├── chat.ts              # Chat streaming
│   ├── analyze-project.ts   # Project analysis (generateObject)
│   ├── score-lead.ts        # Lead scoring
│   ├── generate-content.ts  # Content generation (streaming)
│   ├── quote.ts             # Quote estimation
│   └── translate.ts         # Translation
├── api/
│   ├── contact/route.tsx    # Contact form (Resend emails)
│   └── analytics/route.ts   # Analytics event collection
├── admin/                   # Admin dashboard (CRM, content, analytics)
├── blog/                    # SEO blog
├── contact/                 # Contact page with AI configurator
├── services/                # Services pages
├── realisations/            # Portfolio pages
├── agence/                  # Agency page
└── approche/                # Approach page

lib/
├── ai/
│   ├── models.ts            # Multi-provider config (Claude + OpenAI)
│   ├── prompts.ts           # System prompts
│   └── knowledge-base.ts    # Agency knowledge base
├── db/
│   ├── server.ts            # Supabase server client
│   ├── browser.ts           # Supabase browser client
│   └── types.ts             # DB types
└── utils.ts

components/
├── ai/                      # AI components (chat, configurator)
├── ui/                      # Design system (shadcn + custom)
│   ├── geo-pattern.tsx      # Geometric SVG patterns
│   ├── kinetic-text.tsx     # Animated text cycling
│   ├── scroll-section.tsx   # Scroll-triggered animations
│   ├── craft-card.tsx       # Card with architectural variants
│   ├── arch-frame.tsx       # Arch frame SVG
│   └── lenis-provider.tsx   # Smooth scroll
└── admin/                   # Admin components
```

## Key Conventions

- **Server Actions** for AI: Use `"use server"` + AI SDK 6 (`streamText`, `generateObject`)
- **Design palette**: amber (primary CTA), indigo (secondary), terracotta (accent), emerald (success)
- **CSS**: Tailwind CSS with HSL CSS variables (see `globals.css`)
- **Animations**: Framer Motion + ScrollSection component, NOT CSS-only animations for scroll triggers
- **Components**: shadcn/ui base + custom CraftCard, GeoPattern, KineticText
- **Language**: French (fr) as primary, bi-cultural Belgian/Moroccan positioning

## Environment Variables

See `.env.example` for required variables:
- `RESEND_API_KEY` — Email sending
- `ANTHROPIC_API_KEY` — Claude AI models
- `OPENAI_API_KEY` — GPT fallback
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase admin access

## AI Models

- **Claude Sonnet 4.6** (`claude-sonnet-4-6`): Chat, content generation, complex reasoning
- **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`): Lead scoring, project analysis, quick tasks
- **GPT-4o-mini**: Fallback
