
-- إنشاء جدول المؤسسات العام (بدلاً من مكاتب السفر فقط)
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  type TEXT NOT NULL, -- 'travel_agency', 'restaurant', 'office', 'retail', 'service', 'other'
  logo TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'المملكة العربية السعودية',
  social_media JSONB DEFAULT '{}'::jsonb,
  branding JSONB DEFAULT '{"primary_color": "#1e40af", "secondary_color": "#f59e0b", "font_family": "Arial"}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول الصور المرفوعة
CREATE TABLE public.uploaded_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER,
  type TEXT,
  category TEXT, -- 'background', 'logo', 'product', 'general'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إضافة Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمؤسسات
CREATE POLICY "Users can view their own organizations" 
  ON public.organizations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own organizations" 
  ON public.organizations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own organizations" 
  ON public.organizations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own organizations" 
  ON public.organizations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- سياسات الأمان للصور
CREATE POLICY "Users can view their own images" 
  ON public.uploaded_images 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own images" 
  ON public.uploaded_images 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images" 
  ON public.uploaded_images 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- إضافة عمود organization_id إلى جدول المشاريع
ALTER TABLE public.projects 
ADD COLUMN organization_id UUID REFERENCES public.organizations(id);

-- Triggers لتحديث updated_at
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
