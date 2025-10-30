import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Wand2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Character } from "@/pages/Index";
import AnimatedVideoPlayer from "./AnimatedVideoPlayer";

interface StoryInputProps {
  characters: Character[];
}

const StoryInput = ({ characters }: StoryInputProps) => {
  const [story, setStory] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animation, setAnimation] = useState<string | null>(null);
  const [scenes, setScenes] = useState<any[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!story.trim()) {
      toast({
        title: "Story Required",
        description: "Please write or record your story first",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setAnimation(null);
    setScenes([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-story", {
        body: { story, characters }
      });

      if (error) throw error;

      if (data?.animation) {
        setAnimation(data.animation);
        setScenes(data.scenes || []);
        toast({
          title: "Animation Generated!",
          description: "Your story has been transformed into an animated video!",
        });
      }
    } catch (error) {
      console.error("Error generating animation:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate animation",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
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
                disabled={isGenerating}
                className="flex-1 bg-[var(--gradient-primary)] hover:opacity-90 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 w-5 h-5" />
                    Generate Animation
                  </>
                )}
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong>Pro tip:</strong> Include dialogue, emotions, and scene descriptions for richer animations. 
                The AI will automatically sync character movements and expressions with your story!
              </p>
            </div>

            {scenes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
                  Your Animated Story
                </h3>
                <AnimatedVideoPlayer scenes={scenes} />
              </div>
            )}

            {animation && (
              <div className="mt-6 p-6 rounded-lg bg-card/50 border border-primary/20 shadow-[var(--shadow-glow)]">
                <h3 className="text-xl font-bold mb-4 text-primary">Full Animation Script</h3>
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                  {animation}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StoryInput;
