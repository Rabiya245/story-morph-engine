import { Sparkles, Users, Video, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Explore = () => {
  const features = [
    {
      icon: Users,
      title: "Personalised Characters",
      description: "Upload up to 4 unique character images and define their roles, bringing your vision to life with custom avatars."
    },
    {
      icon: Wand2,
      title: "AI Story Generation",
      description: "Write or record your story, and let our advanced AI transform it into a captivating animated sequence."
    },
    {
      icon: Video,
      title: "Animated Videos",
      description: "Watch as your characters come alive with dynamic movements, actions, and scene transitions perfectly synced to your story."
    },
    {
      icon: Sparkles,
      title: "Scene-by-Scene Creation",
      description: "Each scene is carefully crafted with background generation, character positioning, and narrative flow for a cinematic experience."
    }
  ];

  return (
    <section id="explore" className="py-24 px-4 bg-[var(--gradient-secondary)] relative overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Explore the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Magic</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our AI-powered platform transforms your stories into stunning animated videos with personalized characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-card hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:scale-105 border-border/50 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
