-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  ciudad TEXT,
  vehiculo_tipo TEXT,
  marca TEXT,
  modelo TEXT,
  anio TEXT,
  servicio TEXT NOT NULL,
  mensaje TEXT,
  preferred_contact_method TEXT DEFAULT 'whatsapp',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','quoted','won','lost')),
  notes TEXT,
  source TEXT DEFAULT 'website'
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Quote requests
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  request_type TEXT,
  budget_range TEXT,
  urgency TEXT,
  attachment_urls TEXT[],
  admin_notes TEXT,
  quote_status TEXT DEFAULT 'pending' CHECK (quote_status IN ('pending','sent','accepted','rejected'))
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Projects (gallery)
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  vehicle_type TEXT,
  description TEXT,
  images TEXT[],
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly viewable" ON public.projects
  FOR SELECT USING (published = true);

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  client_name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are publicly viewable" ON public.testimonials
  FOR SELECT USING (published = true);

-- Services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  short_description TEXT,
  long_description TEXT,
  icon TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are publicly viewable" ON public.services
  FOR SELECT USING (published = true);

-- Settings
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are publicly readable" ON public.settings
  FOR SELECT USING (true);

-- User roles for admin
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin policies for leads
CREATE POLICY "Admins can manage leads" ON public.leads
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can insert leads (public form)
CREATE POLICY "Anyone can submit a lead" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Admin policies for quote_requests
CREATE POLICY "Admins can manage quote_requests" ON public.quote_requests
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit quote_requests" ON public.quote_requests
  FOR INSERT WITH CHECK (true);

-- Admin CRUD for projects, testimonials, services, settings
CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage settings" ON public.settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view user_roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-attachments', 'quote-attachments', false);

CREATE POLICY "Project images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can upload quote attachments" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'quote-attachments');

CREATE POLICY "Admins can view quote attachments" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'quote-attachments' AND public.has_role(auth.uid(), 'admin'));