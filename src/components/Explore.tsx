import { Upload, Users, Wand2, Play, MessageSquare, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Upload Character Images",
    description: "Upload up to 4 character images and transform them into animated personalities",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Define Your Cast",
    description: "Customize each character with name, gender, age, and role in your story",
    color: "text-secondary"
  },
  {
    icon: MessageSquare,
    title: "Story Input",
    description: "Write or speak your story - our AI understands both text and voice",
    color: "text-accent"
  },
  {
    icon: Wand2,
    title: "AI Animation",
    description: "Advanced AI converts your characters into realistic animated performers",
    color: "text-primary"
  },
  {
    icon: Palette,
    title: "Scene Generation",
    description: "Automatic scene creation with backgrounds, lighting, and visual effects",
    color: "text-secondary"
  },
  {
    icon: Play,
    title: "Instant Preview",
    description: "Watch your story come alive with synchronized dialogue and motion",
    color: "text-accent"
  }
];

const Explore = () => {
  return (
    <section id="explore" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
            Explore Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create stunning animated stories with personalized characters
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-md hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardContent className="p-6">
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
