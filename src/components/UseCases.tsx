import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Sparkles, Users } from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Help students learn through interactive storytelling. Perfect for language learning, history lessons, and creative writing classes.",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: BookOpen,
    title: "Content Creation",
    description: "Create engaging content for YouTube, social media, or your blog. Bring your written stories to animated life in minutes.",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: Sparkles,
    title: "Children's Entertainment",
    description: "Personalized bedtime stories starring your child's favorite characters. Safe, educational, and endlessly creative.",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: Users,
    title: "Family Memories",
    description: "Transform family photos and memories into animated stories. Perfect for special occasions and keepsakes.",
    color: "bg-primary/10 text-primary"
  }
];

const UseCases = () => {
  return (
    <section className="py-24 px-4 bg-[var(--gradient-secondary)]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
            Endless Possibilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From classrooms to content creation, bring stories to life in ways that inspire and engage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${useCase.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{useCase.title}</h3>
                <p className="text-muted-foreground text-lg">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
