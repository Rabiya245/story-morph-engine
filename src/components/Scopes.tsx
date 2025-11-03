import { BookOpen, GraduationCap, Heart, Briefcase, PartyPopper, Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Scopes = () => {
  const scopes = [
    {
      icon: BookOpen,
      title: "Children's Storytelling",
      description: "Create engaging bedtime stories and educational tales with characters that kids will love and remember."
    },
    {
      icon: GraduationCap,
      title: "Educational Content",
      description: "Bring learning to life with animated lessons, historical recreations, and interactive educational narratives."
    },
    {
      icon: Heart,
      title: "Personal Stories",
      description: "Share family memories, personal journeys, and special moments as beautiful animated keepsakes."
    },
    {
      icon: Briefcase,
      title: "Business Presentations",
      description: "Transform corporate narratives, product stories, and brand messages into compelling visual presentations."
    },
    {
      icon: PartyPopper,
      title: "Special Occasions",
      description: "Create unique animated greetings, invitations, and celebration videos for birthdays, weddings, and events."
    },
    {
      icon: Film,
      title: "Content Creation",
      description: "Produce engaging social media content, YouTube videos, and marketing materials with personalized characters."
    }
  ];

  return (
    <section id="scopes" className="py-24 px-4 bg-background relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Endless <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Possibilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From education to entertainment, our platform empowers you to create animated stories for any purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {scopes.map((scope, index) => (
            <Card 
              key={index} 
              className="glass-card hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 border-border/50 group overflow-hidden"
            >
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <scope.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{scope.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{scope.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scopes;
