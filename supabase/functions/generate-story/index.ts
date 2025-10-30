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

    const systemPrompt = `You are a creative story animator. Your job is to transform stories into detailed animation scripts. 

For the given story, create a structured animation breakdown with:
1. A captivating title
2. Scene-by-scene breakdown with timing
3. Character actions and emotions
4. Camera angles and visual effects
5. Background music suggestions

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

    return new Response(
      JSON.stringify({ animation: generatedAnimation }),
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
