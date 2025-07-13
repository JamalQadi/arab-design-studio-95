
-- إنشاء جدول بيانات مكاتب السفر
CREATE TABLE public.travel_agencies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  agency_name TEXT NOT NULL,
  agency_name_en TEXT,
  logo_url TEXT,
  license_number TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'المملكة العربية السعودية',
  established_year INTEGER,
  services JSONB DEFAULT '[]'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  description TEXT,
  slogan TEXT,
  colors JSONB DEFAULT '{"primary": "#1e40af", "secondary": "#f59e0b"}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إضافة Row Level Security
ALTER TABLE public.travel_agencies ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان
CREATE POLICY "Users can view their own agency data" 
  ON public.travel_agencies 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agency data" 
  ON public.travel_agencies 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agency data" 
  ON public.travel_agencies 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agency data" 
  ON public.travel_agencies 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- إنشاء جدول المشاركات المباشرة
CREATE TABLE public.shared_designs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users NOT NULL,
  share_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'base64url'),
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  password_protected BOOLEAN DEFAULT false,
  password_hash TEXT,
  view_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إضافة Row Level Security للمشاركات
ALTER TABLE public.shared_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own shared designs" 
  ON public.shared_designs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Public shared designs can be viewed by anyone" 
  ON public.shared_designs 
  FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Users can create their own shared designs" 
  ON public.shared_designs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shared designs" 
  ON public.shared_designs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shared designs" 
  ON public.shared_designs 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- trigger لتحديث updated_at
CREATE TRIGGER update_travel_agencies_updated_at
  BEFORE UPDATE ON public.travel_agencies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shared_designs_updated_at
  BEFORE UPDATE ON public.shared_designs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
