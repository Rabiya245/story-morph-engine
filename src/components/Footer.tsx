import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-[var(--gradient-primary)] mb-2">
              StoryViz AI
            </h3>
            <p className="text-muted-foreground">Bringing imagination to life through AI</p>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>for storytellers everywhere</span>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 StoryViz AI. All rights reserved. Empowering creativity through artificial intelligence.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
