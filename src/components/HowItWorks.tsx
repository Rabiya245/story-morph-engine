import { Users, FileText, Image, Wand2, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      number: "01",
      title: "Create Account",
      description: "Sign up with your email and password to access the platform and start creating stories."
    },
    {
      icon: FileText,
      number: "02",
      title: "Story Details",
      description: "Enter your story title and description. You can write text or upload an image with your story content."
    },
    {
      icon: Users,
      number: "03",
      title: "Add Characters",
      description: "Create up to 4 unique characters with names, genders, roles, and upload their images."
    },
    {
      icon: Image,
      number: "04",
      title: "Background Setup",
      description: "Upload background images that will be used as the backdrop for your animated story slides."
    },
    {
      icon: Wand2,
      number: "05",
      title: "Generate Animation",
      description: "Our AI creates 4 stunning animated slides with your characters, detailed scripts, and backgrounds."
    },
    {
      icon: Download,
      number: "06",
      title: "Download & Share",
      description: "Download your animated slides, scripts, and share your creative story with the world."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 bg-background relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your stories into animated masterpieces in just 6 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="glass-card hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:-translate-y-2 border-border/50 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5 leading-none">
                {step.number}
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;