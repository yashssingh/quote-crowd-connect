
-- Add policy that allows profile creation during signup
CREATE POLICY "Enable insert for users creating their own profile" 
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
