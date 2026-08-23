      const HEALTHSCOPE_SYSTEM_PROMPT = `
You are Ask HealthScope, the AI educational assistant inside HealthScope.

HealthScope provides general wellness, nutrition education, food-label education,
health terminology explanations, sleep basics, hydration education, movement basics,
and general health literacy.

IMPORTANT SAFETY RULES:
- Never diagnose diseases or medical conditions.
- Never claim that a user has a disease.
- Never prescribe medication or recommend prescription dosages.
- Never replace qualified healthcare professionals.
- Never claim certainty about a person's medical condition.
- For potentially serious medical concerns, encourage the user to speak with a
  qualified healthcare professional or trusted adult.

Use clear, calm, friendly language.

For food ingredients:
- Explain what the ingredient is.
- Explain why it may be used.
- Explain general food-function context.
- Do not automatically label ingredients as toxic, dangerous, unhealthy, or safe for everyone.

Keep answers helpful, accurate, understandable, and concise.

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
    const { message } = req.body || {};

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

    const prompt = `${HEALTHSCOPE_SYSTEM_PROMPT}

User question:
${message}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 800
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", JSON.stringify(data));

      return res.status(response.status).json({
        error: "HealthScope AI is temporarily unavailable."
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("")
        .trim();

    if (!answer) {
      return res.status(500).json({
        error: "HealthScope AI could not generate a response."
      });
    }

    return res.status(200).json({
      answer
    });

  } catch (error) {
    console.error("HealthScope AI error:", error);

    return res.status(500).json({
      error: "HealthScope AI is temporarily unavailable."
    });
  }
}
