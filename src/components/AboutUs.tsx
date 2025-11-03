import { Mail, Github, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const team = [
    {
      name: "Samiksha",
      email: "samiksha2218@gmail.com",
      role: "Co-Creator"
    },
    {
      name: "Rabiya Basheera",
      email: "rabiyabasheera245@gmail.com",
      role: "Co-Creator"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 bg-[var(--gradient-secondary)] relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about bringing stories to life through technology and creativity
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <Card className="glass-card border-border/50 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our mission is to democratize animated storytelling, making it accessible to everyone regardless of their technical expertise or artistic skills. We believe that every story deserves to be told in the most engaging way possible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Using cutting-edge AI technology, we've created a platform that transforms your imagination into beautiful, animated narratives with personalized characters. Whether you're an educator, content creator, or someone who simply loves telling stories, we're here to help you bring your vision to life.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-10 text-foreground">Meet the Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="glass-card hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:scale-105 border-border/50 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="text-2xl font-bold mb-2 text-foreground">{member.name}</h4>
                  <p className="text-primary mb-4 font-medium">{member.role}</p>
                  <Button 
                    variant="outline" 
                    className="glass-card hover:bg-primary/10 group-hover:border-primary transition-all"
                    onClick={() => window.location.href = `mailto:${member.email}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">{member.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
