import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const StoryInput = () => {
  const [story, setStory] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!story.trim()) {
      toast({
        title: "Story Required",
        description: "Please write or record your story first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Generating Animation",
      description: "Your story is being transformed into an animated masterpiece!",
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording ? "Processing your voice input..." : "Start speaking your story",
    });
  };

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-[var(--gradient-primary)]">
              Write Your Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Textarea
                placeholder="Once upon a time, in a magical land far away..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="min-h-[300px] text-lg bg-background/50 border-border/50 focus:border-primary resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={toggleRecording}
                className={`flex-1 border-2 transition-all duration-300 ${
                  isRecording 
                    ? 'border-destructive bg-destructive/10 hover:bg-destructive/20' 
                    : 'border-accent bg-accent/10 hover:bg-accent/20'
                }`}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="mr-2 w-5 h-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 w-5 h-5" />
                    Record Story
                  </>
                )}
              </Button>

              <Button
                size="lg"
                onClick={handleGenerate}
                className="flex-1 bg-[var(--gradient-primary)] hover:opacity-90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              >
                <Wand2 className="mr-2 w-5 h-5" />
                Generate Animation
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong>Pro tip:</strong> Include dialogue, emotions, and scene descriptions for richer animations. 
                The AI will automatically sync character movements and expressions with your story!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StoryInput;
