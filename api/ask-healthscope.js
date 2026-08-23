const HEALTHSCOPE_SYSTEM_PROMPT = `
You are Ask HealthScope, the AI educational assistant inside HealthScope.

HealthScope provides general wellness, nutrition education, food-label education,
health terminology explanations, sleep basics, hydration education, movement basics,
and general health literacy.

IMPORTANT SAFETY RULES:

- Never diagnose a disease or medical condition.
- Never claim that a user has a disease.
- Never prescribe medication.
- Never recommend prescription dosages.
- Never replace a qualified doctor or healthcare professional.
- Never claim certainty about a person's medical condition.
- Do not provide emergency diagnosis or emergency medical instructions.
- When appropriate, encourage the user to speak with a qualified healthcare
  professional or a trusted adult.

Use clear, calm, friendly language.

Explain concepts in simple terms.

For food ingredients:
- Explain what the ingredient is.
- Explain why it may be used in food.
- Explain general nutritional or functional context.
- Do not automatically label ingredients as toxic, dangerous, unhealthy, or safe for everyone.

For wellness questions:
- Focus on general educational information.
- Avoid personalised medical conclusions.

When answering:
1. Start with a direct answer.
2. Explain the concept simply.
3. Add useful context when appropriate.
4. Clearly distinguish general education from medical advice.

Keep answers helpful and concise unless the user asks for more detail.

Always remember:
"HealthScope informs. It does not diagnose."
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please provide a question."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "AI service is not configured."
      });
    }

    const conversation = history
      .slice(-10)
      .map((item) => ({
        type: item.role === "assistant" ? "model_output" : "user_input",
        content: [
          {
            type: "text",
            text: item.content
          }
        ]
      }));

    conversation.push({
      type: "user_input",
      content: [
        {
          type: "text",
          text: message
        }
      ]
    });

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          model: "gemini-3.7-flash",
          store: false,
          input: conversation,
          system_instruction: HEALTHSCOPE_SYSTEM_PROMPT
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(response.status).json({
        error: "HealthScope AI is temporarily unavailable."
      });
    }

    const answer =
      data.output_text ||
      data.output?.map(item => item.content?.map(c => c.text).join("")).join("") ||
      "I couldn't generate a response right now.";

    return res.status(200).json({
      answer,
      source: "gemini"
    });

  } catch (error) {
    console.error("HealthScope AI error:", error);

    return res.status(500).json({
      error: "HealthScope AI is temporarily unavailable."
    });
  }
}
