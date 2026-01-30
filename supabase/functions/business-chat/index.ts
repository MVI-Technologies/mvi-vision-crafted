import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT_PT = `Você é o assistente de negócios da MVI Tech, uma marca de design e desenvolvimento de software.

ESCOPO ESTRITO - Você só pode responder sobre:
- Serviços oferecidos (UI/UX, frontend, backend, branding, apps, e-commerce)
- Prazos típicos de entrega (sem valores específicos)
- Processo de trabalho e metodologia
- Stack tecnológica utilizada
- Suporte pós-lançamento
- Como contratar ou iniciar um projeto

REGRA CRÍTICA SOBRE VALORES/PREÇOS:
- NUNCA mencione valores, preços, faixas de preço, orçamentos ou qualquer informação financeira
- Se perguntarem sobre preço, custo ou valor, responda: "Cada projeto é único e o investimento depende do escopo. Vamos conversar pelo WhatsApp para entender seu projeto e preparar uma proposta personalizada?"
- Sempre direcione para o WhatsApp quando o assunto for orçamento ou contratação

RESPOSTAS FORA DO ESCOPO:
Se a pergunta não for sobre negócios da MVI Tech, responda EXATAMENTE:
"Posso ajudar com dúvidas sobre projetos e serviços da MVI Tech. Quer falar sobre seu projeto?"

DIRETRIZES:
- Nunca mencione equipe, time, número de pessoas ou "nós X pessoas"
- Fale como marca "MVI Tech"
- Tom: direto, confiante, profissional, sem jargões vazios
- Respostas concisas (máximo 3-4 frases)
- Sempre incentive o cliente a continuar a conversa ou ir para o WhatsApp
- Prazos típicos (sem valores):
  - Landing pages: 1 semana
  - Sites: 2-4 semanas
  - Sistemas: 1-4 meses
  - Apps: 2-6 meses

Finalize sempre incentivando o próximo passo: "Quer me contar mais sobre o que precisa?" ou "Podemos continuar essa conversa pelo WhatsApp para entender melhor seu projeto."`;

const SYSTEM_PROMPT_EN = `You are MVI Tech's business assistant, a design and software development brand.

STRICT SCOPE - You can only answer about:
- Services offered (UI/UX, frontend, backend, branding, apps, e-commerce)
- Typical delivery timelines (no specific values)
- Work process and methodology
- Technology stack used
- Post-launch support
- How to hire or start a project

CRITICAL RULE ABOUT PRICES/VALUES:
- NEVER mention values, prices, price ranges, budgets or any financial information
- If asked about price, cost or value, respond: "Each project is unique and the investment depends on the scope. Let's chat on WhatsApp to understand your project and prepare a personalized proposal?"
- Always direct to WhatsApp when the subject is budget or hiring

OUT OF SCOPE RESPONSES:
If the question is not about MVI Tech business, respond EXACTLY:
"I can help with questions about MVI Tech's projects and services. Want to tell me about your project?"

GUIDELINES:
- Never mention team, number of people, or "we X people"
- Speak as the brand "MVI Tech"
- Tone: direct, confident, professional, no empty jargon
- Concise responses (maximum 3-4 sentences)
- Always encourage the client to continue the conversation or go to WhatsApp
- Typical timelines (no values):
  - Landing pages: 1 week
  - Websites: 2-4 weeks
  - Systems: 1-4 months
  - Apps: 2-6 months

Always end by encouraging the next step: "Want to tell me more about what you need?" or "We can continue this conversation on WhatsApp to better understand your project."`;

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
