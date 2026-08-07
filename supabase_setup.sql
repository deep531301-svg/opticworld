-- 1. Create store_settings table
CREATE TABLE IF NOT EXISTS public.store_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert initial admin passcode
INSERT INTO public.store_settings (key, value) 
VALUES ('admin_passcode', '7880')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 3. Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT,
    subcategory TEXT,
    price NUMERIC NOT NULL,
    rating TEXT DEFAULT '4.5',
    image TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create offers (coupons) table
CREATE TABLE IF NOT EXISTS public.offers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    code TEXT NOT NULL UNIQUE,
    category TEXT,
    expiry TEXT,
    badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they already exist to prevent duplicate key errors
DROP POLICY IF EXISTS "Allow anonymous read access on settings" ON public.store_settings;
DROP POLICY IF EXISTS "Allow anonymous read access on products" ON public.products;
DROP POLICY IF EXISTS "Allow anonymous read access on offers" ON public.offers;

DROP POLICY IF EXISTS "Allow auth write access on settings" ON public.store_settings;
DROP POLICY IF EXISTS "Allow auth write access on products" ON public.products;
DROP POLICY IF EXISTS "Allow auth write access on offers" ON public.offers;

-- Create policies for public reading (necessary for website catalog loading)
CREATE POLICY "Allow anonymous read access on settings" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on offers" ON public.offers FOR SELECT USING (true);

-- Create policies for authenticated write access (for owner login updates)
CREATE POLICY "Allow auth write access on settings" ON public.store_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write access on products" ON public.products FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow auth write access on offers" ON public.offers FOR ALL TO authenticated USING (true);
