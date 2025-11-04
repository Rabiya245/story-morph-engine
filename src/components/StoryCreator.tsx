import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, Wand2, Download } from "lucide-react";
import CharacterUploader, { Character } from "./CharacterUploader";
import AnimatedVideoPlayer from "./AnimatedVideoPlayer";

export interface Scene {
  scene: number;
  background: string;
  narration: string;
  characters: Array<{
    name: string;
    position: string;
    action: string;
    expression?: string;
    gesture?: string;
  }>;
}

const StoryCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [storyImage, setStoryImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [characters, setCharacters] = useState<Character[]>([
    { id: 1, image: null, name: "", gender: "", role: "" },
    { id: 2, image: null, name: "", gender: "", role: "" },
    { id: 3, image: null, name: "", gender: "", role: "" },
    { id: 4, image: null, name: "", gender: "", role: "" },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animationScript, setAnimationScript] = useState("");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const { toast } = useToast();

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('story-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('story-uploads')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handleGenerate = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both story title and description.",
        variant: "destructive",
      });
      return;
    }

    const validCharacters = characters.filter(c => c.name && c.image && c.gender && c.role);
    if (validCharacters.length === 0) {
      toast({
        title: "No Characters",
        description: "Please add at least one character with all details filled.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Upload images
      let storyImageUrl = null;
      let backgroundImageUrl = null;

      if (storyImage) {
        storyImageUrl = await uploadFile(storyImage, 'stories');
      }

      if (backgroundImage) {
        backgroundImageUrl = await uploadFile(backgroundImage, 'backgrounds');
      }

      // Create story in database
      const { data: storyData, error: storyError } = await supabase
        .from('stories')
        .insert({
          user_id: user.id,
          title,
          description,
          story_image: storyImageUrl,
          background_image: backgroundImageUrl,
        })
        .select()
        .single();

      if (storyError) throw storyError;

      // Save characters
      const characterData = validCharacters.map(char => ({
        story_id: storyData.id,
        name: char.name,
        gender: char.gender,
        role: char.role,
        image: char.image!,
      }));

      const { error: charError } = await supabase
        .from('characters')
        .insert(characterData);

      if (charError) throw charError;

      // Generate animation
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-story', {
        body: { 
          story: description,
          characters: validCharacters.map(c => ({
            name: c.name,
            gender: c.gender,
            role: c.role,
          })),
          storyId: storyData.id,
          backgroundImage: backgroundImageUrl,
        }
      });

      if (functionError) throw functionError;

      setAnimationScript(functionData.animation);
      setScenes(functionData.scenes);

      toast({
        title: "Success!",
        description: "Your animated story has been generated.",
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate animation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="creator" className="py-24 px-4 bg-[var(--gradient-secondary)] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Start <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Creating</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Bring your imagination to life with AI-powered animation
          </p>
        </div>

        <div className="space-y-8">
          {/* Story Title */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Story Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Enter your story title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </CardContent>
          </Card>

          {/* Story Description */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Story Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write your story here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="text-base"
              />
              
              <div className="space-y-2">
                <Label htmlFor="story-image">Or Upload Story Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="story-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setStoryImage(e.target.files?.[0] || null)}
                    className="flex-1"
                  />
                  {storyImage && (
                    <span className="text-sm text-muted-foreground">
                      {storyImage.name}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Characters */}
          <CharacterUploader characters={characters} setCharacters={setCharacters} />

          {/* Background Image */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Background Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="background-image">Upload Background for Story Slides</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="background-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBackgroundImage(e.target.files?.[0] || null)}
                    className="flex-1"
                  />
                  {backgroundImage && (
                    <span className="text-sm text-muted-foreground">
                      {backgroundImage.name}
                    </span>
                  )}
                </div>
                {backgroundImage && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(backgroundImage)}
                      alt="Background preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            size="lg"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Animation...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Animation
              </>
            )}
          </Button>

          {/* Animation Preview */}
          {animationScript && scenes.length > 0 && (
            <div className="space-y-6">
              <AnimatedVideoPlayer 
                script={animationScript}
                scenes={scenes}
                characters={characters.filter(c => c.name && c.image)}
              />
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Full Animation Script</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-96">
                    {animationScript}
                  </pre>
                  <Button
                    onClick={() => {
                      const blob = new Blob([animationScript], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${title || 'story'}-script.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="mt-4"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Script
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoryCreator;