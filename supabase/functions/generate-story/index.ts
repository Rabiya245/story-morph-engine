import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { story, characters } = await req.json();
    
    if (!story || !story.trim()) {
      return new Response(
        JSON.stringify({ error: "Story is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Filter characters that have at least a name
    const activeCharacters = characters?.filter((c: any) => c.name?.trim()) || [];
    
    // Build character context
    const characterContext = activeCharacters.length > 0
      ? `\n\nCharacters in this story:\n${activeCharacters.map((c: any, i: number) => 
          `${i + 1}. ${c.name}${c.age ? ` (age ${c.age})` : ''}${c.gender ? ` - ${c.gender}` : ''}${c.role ? ` - Role: ${c.role}` : ''}`
        ).join('\n')}`
      : '';

    const systemPrompt = `You are a creative story animator. Your job is to transform stories into detailed animation scripts with character expressions and gestures.

For the given story, create a structured animation breakdown with:
1. A captivating title
2. Scene-by-scene breakdown (5-8 scenes max)
3. For EACH character in EACH scene, specify:
   - Their expression (e.g., happy, sad, surprised, angry, thinking, excited, worried)
   - Their gesture (e.g., waving, pointing, hands on hips, arms crossed, clapping, covering mouth, reaching out)
   - Their action (e.g., walking, running, jumping, sitting, standing)
4. Camera angles and visual effects
5. Background setting description

Format each scene clearly like this:
Scene [number]: [Scene title]
Setting: [Detailed environment description]
[Character Name]: Expression - [emotion], Gesture - [hand movement], Action - [what they're doing]
[Narration text for the scene]

Make it vivid, detailed, and production-ready.${characterContext}`;

    console.log("Generating animation for story...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: story }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedAnimation = data.choices?.[0]?.message?.content;

    if (!generatedAnimation) {
      throw new Error("No content generated");
    }

    console.log("Animation generated successfully");

    // Parse scenes and generate images for key scenes
    const sceneBlocks = generatedAnimation.split(/Scene \d+:/i).filter((s: string) => s.trim());
    const sceneImages = [];

    // Generate images for first 5 scenes with detailed character info
    for (let i = 0; i < Math.min(5, sceneBlocks.length); i++) {
      const sceneText = sceneBlocks[i].trim();
      const scenePreview = sceneText.substring(0, 800);
      
      try {
        // Extract setting/background description
        const settingMatch = sceneText.match(/Setting:\s*([^\n]+)/i);
        const settingDescription = settingMatch ? settingMatch[1] : scenePreview.substring(0, 200);
        
        // Extract character-specific info from the scene
        const characterInfo = activeCharacters.map((char: any, idx: number) => {
          const charName = char.name || '';
          const charRegex = new RegExp(`${charName}[:\\s]*(?:Expression[\\s-]*([^,\\n]+))?[,\\s]*(?:Gesture[\\s-]*([^,\\n]+))?[,\\s]*(?:Action[\\s-]*([^\\n]+))?`, 'i');
          const charMatch = sceneText.match(charRegex);
          
          // Extract expression, gesture, and action
          const expression = charMatch?.[1]?.trim().toLowerCase() || 'neutral';
          const gesture = charMatch?.[2]?.trim().toLowerCase() || 'standing';
          const action = charMatch?.[3]?.trim().toLowerCase() || 'idle';
          
          // Determine if character is active in this scene
          const isActive = sceneText.toLowerCase().includes(charName.toLowerCase());
          
          return {
            name: charName,
            imageUrl: char.imageUrl,
            position: { 
              x: 15 + (idx * 35), 
              y: isActive ? 55 : 65 
            },
            expression: expression,
            gesture: gesture,
            action: isActive ? action : 'idle'
          };
        });
        
        const backgroundPrompt = `Create a vibrant, cinematic animated storybook background for: ${settingDescription}. 
Style: colorful, atmospheric illustration without any characters or people. 
Focus on the environment, lighting, and mood. Make it suitable for an animated story scene.`;
        
        const backgroundResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image-preview",
            messages: [
              { role: "user", content: backgroundPrompt }
            ],
            modalities: ["image", "text"]
          }),
        });

        if (backgroundResponse.ok) {
          const imageData = await backgroundResponse.json();
          const backgroundUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          
          if (backgroundUrl) {
            sceneImages.push({
              sceneNumber: i + 1,
              backgroundUrl: backgroundUrl,
              text: sceneText.substring(0, 300),
              characters: characterInfo
            });
          }
        }
      } catch (error) {
        console.error(`Error generating scene ${i + 1}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ 
        animation: generatedAnimation,
        scenes: sceneImages
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-story function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
