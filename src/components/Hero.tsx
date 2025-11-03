import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToCreator = () => {
    document.getElementById('creator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[var(--gradient-secondary)]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-500">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Story Animation</span>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">Bring your stories to life</p>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Bring Your Stories{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
            To Life
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          Transform your imagination into animated stories with personalized characters. 
          Upload images, define your cast, and watch AI create magical animated tales.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Button 
            size="lg" 
            onClick={scrollToCreator}
            className="bg-[var(--gradient-primary)] hover:opacity-90 text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-lg px-8 py-6 group"
          >
            Start Creating
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 text-lg px-8 py-6"
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">1K+</div>
            <div className="text-sm text-white/80">Create Stories</div>
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
