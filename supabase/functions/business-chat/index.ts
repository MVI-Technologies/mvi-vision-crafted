import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT_PT = `Você é o assistente de negócios da MVI Tech, uma marca de design e desenvolvimento de software.

ESCOPO ESTRITO - Você só pode responder sobre:
- Serviços oferecidos (UI/UX, frontend, backend, branding, apps, e-commerce)
- Faixas de preço e orçamento (NUNCA valores exatos, sempre faixas)
- Prazos típicos de entrega
- Processo de trabalho e metodologia
- Stack tecnológica utilizada
- Suporte pós-lançamento
- Como contratar ou iniciar um projeto

RESPOSTAS FORA DO ESCOPO:
Se a pergunta não for sobre negócios da MVI Tech, responda EXATAMENTE:
"Posso ajudar com dúvidas sobre projetos, serviços, prazos e orçamento da MVI Tech. Quer falar sobre seu projeto?"

DIRETRIZES:
- Nunca mencione equipe, time, número de pessoas ou "nós X pessoas"
- Fale como marca "MVI Tech"
- Tom: direto, confiante, profissional, sem jargões vazios
- Respostas concisas (máximo 3-4 frases)
- Sempre ofereça próximo passo ou pergunta de follow-up
- Faixas de preço sugeridas:
  - Sites institucionais: R$ 5.000 a R$ 15.000
  - Landing pages: R$ 2.000 a R$ 5.000
  - Plataformas/sistemas: R$ 20.000 a R$ 80.000+
  - Apps mobile: R$ 30.000 a R$ 100.000+
  - Branding: R$ 3.000 a R$ 15.000
- Prazos típicos:
  - Landing pages: 1 semana
  - Sites: 2-4 semanas
  - Sistemas: 1-4 meses
  - Apps: 2-6 meses

Finalize respostas sobre orçamento com: "Quer que eu faça 3 perguntas rápidas para estimar orçamento?"`;

const SYSTEM_PROMPT_EN = `You are MVI Tech's business assistant, a design and software development brand.

STRICT SCOPE - You can only answer about:
- Services offered (UI/UX, frontend, backend, branding, apps, e-commerce)
- Price ranges and budgets (NEVER exact values, always ranges)
- Typical delivery timelines
- Work process and methodology
- Technology stack used
- Post-launch support
- How to hire or start a project

OUT OF SCOPE RESPONSES:
If the question is not about MVI Tech business, respond EXACTLY:
"I can help with MVI Tech's services, timelines, pricing ranges and hiring. Want to tell me about your project?"

GUIDELINES:
- Never mention team, number of people, or "we X people"
- Speak as the brand "MVI Tech"
- Tone: direct, confident, professional, no empty jargon
- Concise responses (maximum 3-4 sentences)
- Always offer next step or follow-up question
- Suggested price ranges:
  - Institutional websites: $2,000 to $8,000
  - Landing pages: $1,000 to $3,000
  - Platforms/systems: $10,000 to $50,000+
  - Mobile apps: $15,000 to $60,000+
  - Branding: $2,000 to $8,000
- Typical timelines:
  - Landing pages: 1 week
  - Websites: 2-4 weeks
  - Systems: 1-4 months
  - Apps: 2-6 months

End budget responses with: "Want me to ask 3 quick questions to estimate a budget?"`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, lang } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = lang === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_PT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: lang === "en" 
            ? "Rate limit exceeded, please try again later." 
            : "Limite de requisições excedido, tente novamente mais tarde." 
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: lang === "en"
            ? "Service temporarily unavailable."
            : "Serviço temporariamente indisponível."
          }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("business-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
