
-- Create enum types for project types and statuses
CREATE TYPE project_type AS ENUM ('travel', 'cv', 'logo', 'social');
CREATE TYPE project_status AS ENUM ('مكتمل', 'مسودة', 'قيد التطوير');

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type project_type NOT NULL,
  status project_status NOT NULL DEFAULT 'مسودة',
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  downloads INTEGER NOT NULL DEFAULT 0
);

-- Create templates table
CREATE TABLE public.templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_custom BOOLEAN NOT NULL DEFAULT true
);

-- Create cvs table
CREATE TABLE public.cvs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for projects table
CREATE POLICY "Users can view their own projects" 
  ON public.projects 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
  ON public.projects 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
  ON public.projects 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for templates table
CREATE POLICY "Users can view their own templates" 
  ON public.templates 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates" 
  ON public.templates 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" 
  ON public.templates 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" 
  ON public.templates 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for cvs table
CREATE POLICY "Users can view their own cvs" 
  ON public.cvs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cvs" 
  ON public.cvs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cvs" 
  ON public.cvs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cvs" 
  ON public.cvs 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON public.projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cvs_updated_at 
  BEFORE UPDATE ON public.cvs 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_type ON public.projects(type);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_templates_user_id ON public.templates(user_id);
CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_cvs_user_id ON public.cvs(user_id);
