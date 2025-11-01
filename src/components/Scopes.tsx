import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Sparkles, Users, Video, Briefcase } from "lucide-react";

const scopes = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Interactive storytelling for language learning, history lessons, and creative writing classes",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: BookOpen,
    title: "Content Creation",
    description: "Create engaging content for YouTube, social media, and blogs with animated stories",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: Sparkles,
    title: "Children's Entertainment",
    description: "Personalized bedtime stories with custom characters - safe and educational",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: Users,
    title: "Family Memories",
    description: "Transform family photos into animated stories for special occasions",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Video,
    title: "Marketing & Ads",
    description: "Create compelling brand stories with personalized animated characters",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: Briefcase,
    title: "Corporate Training",
    description: "Engaging training materials with scenario-based animated narratives",
    color: "bg-accent/10 text-accent"
  }
];

const Scopes = () => {
  return (
    <section id="scopes" className="py-24 px-4 bg-[var(--gradient-secondary)]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
            Endless Scopes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From classrooms to boardrooms, bring stories to life in ways that inspire and engage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scopes.map((scope, index) => (
            <Card 
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-md hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${scope.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <scope.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{scope.title}</h3>
                <p className="text-muted-foreground text-lg">{scope.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scopes;
