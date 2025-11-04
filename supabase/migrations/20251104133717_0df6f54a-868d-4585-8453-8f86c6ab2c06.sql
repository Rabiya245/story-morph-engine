-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  story_image TEXT,
  background_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policies for stories
CREATE POLICY "Users can view their own stories" 
ON public.stories 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stories" 
ON public.stories 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories" 
ON public.stories 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories" 
ON public.stories 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create characters table
CREATE TABLE public.characters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gender TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

-- Create policies for characters
CREATE POLICY "Users can view characters of their stories" 
ON public.characters 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = characters.story_id 
    AND stories.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create characters for their stories" 
ON public.characters 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = characters.story_id 
    AND stories.user_id = auth.uid()
  )
);

-- Create slides table
CREATE TABLE public.slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  slide_number INTEGER NOT NULL,
  script TEXT NOT NULL,
  animated_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

-- Create policies for slides
CREATE POLICY "Users can view slides of their stories" 
ON public.slides 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = slides.story_id 
    AND stories.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create slides for their stories" 
ON public.slides 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.stories 
    WHERE stories.id = slides.story_id 
    AND stories.user_id = auth.uid()
  )
);

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('story-uploads', 'story-uploads', true);

-- Create storage policies
CREATE POLICY "Users can upload their own files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'story-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view uploaded files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'story-uploads');

-- Create trigger for updating timestamps
CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();