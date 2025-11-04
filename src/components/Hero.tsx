import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToCreator = () => {
    document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAuth = () => {
    window.location.href = '/auth';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-500">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">AI-Powered Story Visualization</span>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">Transform your stories into animated experiences</p>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Story Visualization with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Personalized Character
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          Transform your imagination into animated stories with personalized characters. 
          Upload images, define your cast, and watch AI create magical animated tales.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Button 
            size="lg" 
            onClick={scrollToAuth}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300 text-lg px-8 py-6 group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={scrollToCreator}
            className="border-2 glass-card hover:bg-primary/10 hover:border-primary transition-all duration-300 text-lg px-8 py-6"
          >
            Start Creating
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1K+</div>
            <div className="text-sm text-muted-foreground">Stories Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">4</div>
            <div className="text-sm text-muted-foreground">Characters Per Story</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-muted-foreground">AI-Powered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
