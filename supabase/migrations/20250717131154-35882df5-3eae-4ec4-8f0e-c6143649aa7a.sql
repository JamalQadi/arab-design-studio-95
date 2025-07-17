-- حذف القيد القديم وإضافة قيد جديد بالقيم الصحيحة
ALTER TABLE public.organizations 
DROP CONSTRAINT IF EXISTS organizations_type_check;

ALTER TABLE public.organizations 
ADD CONSTRAINT organizations_type_check 
CHECK (type = ANY (ARRAY[
  'travel_agency'::text,
  'restaurant'::text, 
  'office'::text,
  'retail'::text,
  'service'::text,
  'healthcare'::text,
  'education'::text,
  'other'::text
]));