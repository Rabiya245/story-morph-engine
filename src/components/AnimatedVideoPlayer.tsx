import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Character {
  name: string;
  imageUrl?: string;
  position: { x: number; y: number };
  action: string;
}

interface Scene {
  sceneNumber: number;
  backgroundUrl: string;
  text: string;
  characters: Character[];
}

interface AnimatedVideoPlayerProps {
  scenes: Scene[];
}

const AnimatedVideoPlayer = ({ scenes }: AnimatedVideoPlayerProps) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || scenes.length === 0) return;

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      } else {
        setIsPlaying(false);
        setCurrentScene(0);
      }
    }, 5000); // 5 seconds per scene

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying, scenes.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentScene(Math.max(0, currentScene - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentScene(Math.min(scenes.length - 1, currentScene + 1));
    setIsPlaying(false);
  };

  if (scenes.length === 0) return null;

  const scene = scenes[currentScene];

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-primary/20">
      <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        {/* Background with parallax effect */}
        <img
          key={`bg-${currentScene}`}
          src={scene.backgroundUrl}
          alt={`Scene ${scene.sceneNumber} background`}
          className="w-full h-full object-cover animate-fade-in"
          style={{
            animation: 'fadeIn 0.5s ease-in, slowZoom 5s ease-in-out infinite alternate'
          }}
        />
        
        {/* Animated characters */}
        {scene.characters?.map((character, idx) => character.imageUrl && (
          <div
            key={`${currentScene}-${idx}`}
            className="absolute transition-all duration-1000 ease-out"
            style={{
              left: `${character.position.x}%`,
              bottom: `${character.position.y}%`,
              transform: 'translateX(-50%)',
              animation: character.action === 'active' 
                ? 'bounce 2s ease-in-out infinite, fadeIn 0.8s ease-in' 
                : 'gentle-float 3s ease-in-out infinite, fadeIn 0.8s ease-in',
              animationDelay: `${idx * 0.2}s`
            }}
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className="h-32 w-auto object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))'
              }}
            />
          </div>
        ))}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-white text-lg font-medium animate-fade-in">
            {scene.text.substring(0, 200)}...
          </p>
        </div>
        <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full">
          <span className="text-white text-sm font-semibold">
            Scene {currentScene + 1} / {scenes.length}
          </span>
        </div>
      </div>

      <div className="p-4 bg-card">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentScene === 0}
            className="hover:scale-105 transition-transform"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full bg-[var(--gradient-primary)] hover:opacity-90 shadow-[var(--shadow-glow)] hover:scale-110 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentScene === scenes.length - 1}
            className="hover:scale-105 transition-transform"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-4 bg-muted/50 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[var(--gradient-primary)] transition-all duration-300"
            style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default AnimatedVideoPlayer;
