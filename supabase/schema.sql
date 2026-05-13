-- VISTEAPY Schema SQL
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id                 UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre             TEXT,
  phone              TEXT,
  avatar_url         TEXT,
  marketing_consent  BOOLEAN     DEFAULT FALSE,
  consent_date       TIMESTAMPTZ,
  consent_ip         TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ver propio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Actualizar propio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, nombre, avatar_url)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'), NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. WISHLIST
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id            UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id    TEXT  NOT NULL,
  mode_slug     TEXT  NOT NULL,
  product_name  TEXT,
  product_image TEXT,
  product_price INTEGER,
  added_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gestionar propia wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. EMAIL LOGS
CREATE TABLE IF NOT EXISTS public.email_logs (
  id          UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID  REFERENCES auth.users(id) ON DELETE SET NULL,
  email       TEXT  NOT NULL,
  tipo        TEXT  NOT NULL,
  campaign_id TEXT,
  status      TEXT  DEFAULT 'sent',
  sent_at     TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Solo sistema gestiona email_logs" ON public.email_logs FOR ALL USING (false);
