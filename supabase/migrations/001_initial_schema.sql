-- Atlas Digital Impact — Initial Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- ============================================================
-- 1. LEADS — CRM leads from forms, chat, configurator, quotes
-- ============================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('form', 'chat', 'configurator', 'quote')),
  score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. CONVERSATIONS — Chat conversations with message history
-- ============================================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. ANALYTICS EVENTS — Page views, clicks, interactions
-- ============================================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  page TEXT NOT NULL,
  metadata JSONB,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying analytics by date and type
CREATE INDEX idx_analytics_events_created_at ON analytics_events (created_at DESC);
CREATE INDEX idx_analytics_events_event_type ON analytics_events (event_type);
CREATE INDEX idx_analytics_events_session_id ON analytics_events (session_id);

-- ============================================================
-- 4. BLOG POSTS — SEO blog content
-- ============================================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_status ON blog_posts (status);

-- ============================================================
-- 5. QUOTES — Project quotes linked to leads/conversations
-- ============================================================
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  project_type TEXT NOT NULL,
  requirements JSONB NOT NULL DEFAULT '{}'::jsonb,
  estimated_budget TEXT NOT NULL,
  estimated_timeline TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Service role has full access (used by server-side API routes)
CREATE POLICY "Service role full access on leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on conversations"
  ON conversations FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on analytics_events"
  ON analytics_events FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on blog_posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on quotes"
  ON quotes FOR ALL
  USING (auth.role() = 'service_role');

-- Public read access for published blog posts (anon key)
CREATE POLICY "Public read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Allow anonymous inserts for analytics events (from client-side tracking)
CREATE POLICY "Anonymous insert analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Allow anonymous inserts for leads (from contact forms)
CREATE POLICY "Anonymous insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Allow anonymous inserts for conversations (from chat widget)
CREATE POLICY "Anonymous insert conversations"
  ON conversations FOR INSERT
  WITH CHECK (true);
