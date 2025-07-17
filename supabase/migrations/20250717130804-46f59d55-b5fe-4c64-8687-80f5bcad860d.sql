-- إضافة الأعمدة المفقودة إلى جدول المؤسسات
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'المملكة العربية السعودية',
ADD COLUMN IF NOT EXISTS name_en TEXT;