import { useState } from "react";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import CharacterUploader from "@/components/CharacterUploader";
import StoryInput from "@/components/StoryInput";
import Scopes from "@/components/Scopes";
import AboutUs from "@/components/AboutUs";
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
      <Explore />
      <CharacterUploader characters={characters} setCharacters={setCharacters} />
      <StoryInput characters={characters} />
      <Scopes />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Index;
