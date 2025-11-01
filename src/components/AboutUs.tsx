import { Card, CardContent } from "@/components/ui/card";
import { Mail, Users as UsersIcon } from "lucide-react";

const teamMembers = [
  {
    name: "Samiksha",
    email: "samiksha2218@gmail.com",
    role: "Co-Founder"
  },
  {
    name: "Rabiya Basheera",
    email: "rabiyabasheera245@gmail.com",
    role: "Co-Founder"
  }
];

const AboutUs = () => {
  return (
    <section id="about" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-primary/30 mb-6">
            <UsersIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Meet the Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
            About Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're passionate about bringing imagination to life through AI-powered storytelling. 
            Our mission is to make animated story creation accessible to everyone.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-md hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-primary-foreground">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-center text-card-foreground">
                    {member.name}
                  </h3>
                  <p className="text-center text-muted-foreground mb-4 font-medium">
                    {member.role}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Mail className="w-4 h-4" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-sm hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/30 bg-card/50 backdrop-blur-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe everyone has stories worth telling. Through cutting-edge AI technology 
                and intuitive design, we're democratizing animated storytelling, making it possible 
                for anyone to create cinematic experiences with their personalized characters. 
                Join us in revolutionizing the way stories are told.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
