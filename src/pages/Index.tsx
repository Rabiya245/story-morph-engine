import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import HowItWorks from "@/components/HowItWorks";
import StoryCreator from "@/components/StoryCreator";
import Scopes from "@/components/Scopes";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <Explore />
      <HowItWorks />
      {user && <StoryCreator />}
      <Scopes />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Index;
