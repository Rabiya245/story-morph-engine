import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CharacterUploader from "@/components/CharacterUploader";
import StoryInput from "@/components/StoryInput";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

export interface Character {
  id: number;
  image: string | null;
  name: string;
  gender: string;
  age: string;
  role: string;
}

const Index = () => {
  const [characters, setCharacters] = useState<Character[]>([
    { id: 1, image: null, name: "", gender: "", age: "", role: "" },
    { id: 2, image: null, name: "", gender: "", age: "", role: "" },
    { id: 3, image: null, name: "", gender: "", age: "", role: "" },
    { id: 4, image: null, name: "", gender: "", age: "", role: "" },
  ]);

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CharacterUploader characters={characters} setCharacters={setCharacters} />
      <StoryInput characters={characters} />
      <UseCases />
      <Footer />
    </div>
  );
};

export default Index;
