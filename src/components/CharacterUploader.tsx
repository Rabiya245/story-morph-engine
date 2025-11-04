import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Character {
  id: number;
  image: string | null;
  name: string;
  gender: string;
  role: string;
}

interface CharacterUploaderProps {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
}

const CharacterUploader = ({ characters, setCharacters }: CharacterUploaderProps) => {

  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacters(characters.map(char => 
          char.id === id ? { ...char, image: reader.result as string } : char
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id: number) => {
    setCharacters(characters.map(char => 
      char.id === id ? { ...char, image: null } : char
    ));
  };

  const handleInputChange = (id: number, field: keyof Character, value: string) => {
    setCharacters(characters.map(char => 
      char.id === id ? { ...char, [field]: value } : char
    ));
  };

  return (
    <section id="creator" className="py-24 px-4 bg-[var(--gradient-secondary)] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Characters</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload images and define up to 4 unique characters for your story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {characters.map((character) => (
            <Card key={character.id} className="border-border/50 bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">Character {character.id}</h3>
                
                {/* Image Upload */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Character Image</Label>
                  {!character.image ? (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                      <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Click to upload image</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(character.id, e)}
                      />
                    </label>
                  ) : (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                      <img src={character.image} alt={`Character ${character.id}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemoveImage(character.id)}
                        className="absolute top-2 right-2 p-2 bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Character Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`name-${character.id}`} className="text-sm font-medium mb-2 block">Name</Label>
                    <Input
                      id={`name-${character.id}`}
                      placeholder="Enter character name"
                      value={character.name}
                      onChange={(e) => handleInputChange(character.id, 'name', e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`gender-${character.id}`} className="text-sm font-medium mb-2 block">Gender</Label>
                    <Select onValueChange={(value) => handleInputChange(character.id, 'gender', value)}>
                      <SelectTrigger id={`gender-${character.id}`} className="bg-background/50 border-border/50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`role-${character.id}`} className="text-sm font-medium mb-2 block">Role</Label>
                    <Input
                      id={`role-${character.id}`}
                      placeholder="e.g., Hero, Villain, Mentor"
                      value={character.role}
                      onChange={(e) => handleInputChange(character.id, 'role', e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterUploader;
