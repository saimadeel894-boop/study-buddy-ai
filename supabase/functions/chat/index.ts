import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const subjectPrompts: Record<string, string> = {
  math: `You are an expert MATH tutor. When explaining:
- Always show step-by-step solutions with clear formulas
- Use mathematical notation where helpful
- Explain WHY each step works
- Include a worked example
- Mention common mistakes to avoid`,
  
  science: `You are an expert SCIENCE tutor. When explaining:
- Use real-world examples students can relate to
- Break down complex processes into simple steps
- Include cause and effect relationships
- Reference everyday phenomena when possible
- Explain the "why" behind scientific concepts`,
  
  coding: `You are an expert CODING tutor. When explaining:
- Include clear, commented code examples
- Explain what each part of the code does
- Show both the concept and practical implementation
- Mention best practices and common errors
- Suggest exercises to practice`,
  
  english: `You are an expert ENGLISH tutor. When explaining:
- Focus on grammar rules and their usage
- Provide clear examples in sentences
- Explain meanings and context
- Include synonyms and related vocabulary
- Give writing tips when relevant`,
  
  history: `You are an expert HISTORY tutor. When explaining:
- Provide clear chronological context
- Explain causes and consequences
- Connect events to their broader impact
- Include interesting facts to aid memory
- Relate historical events to modern relevance`,
  
  general: `You are a knowledgeable tutor covering all subjects.`
};

const baseSystemPrompt = `You are StudyAI, an expert AI study assistant designed to help students learn effectively.

RESPONSE FORMAT - Structure EVERY answer like this:

## 📖 Simple Explanation
[2-3 sentences explaining the concept in the simplest terms possible]

## 🔢 Step-by-Step
[Numbered steps breaking down the concept or solution]

## 💡 Example
[One clear, relevant example that illustrates the concept]

## ✅ Key Points
- [Point 1]
- [Point 2]
- [Point 3]

## 🚀 What to Learn Next
[2-3 related topics the student should explore]

GUIDELINES:
- Use student-friendly language that's easy to understand
- Be encouraging and supportive
- Focus on UNDERSTANDING, not just answers
- Highlight important terms with **bold**
- Keep explanations concise but complete
- If it's a problem, show the solution process clearly`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY is not configured');
      throw new Error('API key is not configured');
    }

    const { messages, subjectMode, toolType } = await req.json();
    console.log('Received messages:', messages.length, 'Subject mode:', subjectMode, 'Tool type:', toolType);

    // Build system prompt based on mode and tool type
    let finalSystemPrompt = baseSystemPrompt;
    
    if (subjectMode && subjectPrompts[subjectMode]) {
      finalSystemPrompt = subjectPrompts[subjectMode] + "\n\n" + baseSystemPrompt;
    }

    // Special prompts for quick study tools
    if (toolType === 'formula') {
      finalSystemPrompt = `You are a formula explainer. When given a formula:
1. State the formula clearly
2. Explain what each variable/symbol means
3. Explain when and how to use it
4. Give a simple example with numbers
5. Mention common mistakes
Keep it concise and student-friendly.`;
    } else if (toolType === 'definition') {
      finalSystemPrompt = `You are a definition finder. When given a term:
1. Give a clear, simple definition
2. Provide the context/subject area
3. Give an example of usage
4. List 2-3 related terms
Keep definitions brief and memorable.`;
    } else if (toolType === 'simplify') {
      finalSystemPrompt = `You are a concept simplifier. Explain the concept as if talking to a 12-year-old:
1. Use simple, everyday words
2. Use relatable analogies
3. Avoid jargon completely
4. Make it fun and memorable
5. End with a simple summary
Your goal is to make ANY concept understandable.`;
    } else if (toolType === 'notes') {
      finalSystemPrompt = `You are a revision notes generator. Create concise study notes:
1. Key concept in one sentence
2. 3-5 bullet points of important facts
3. One memorable example or tip
4. Quick summary for last-minute revision
Keep it scannable and easy to review.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: finalSystemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });
  } catch (error: unknown) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
