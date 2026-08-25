const WELLNESS_SYSTEM_PROMPT = `
You are HealthScope AI, an educational wellness pattern assistant.

You receive self-entered wellness observations from a user across different days.

Your job is to provide a short, clear, neutral overview of observable patterns.

STRICT RULES:
- Use ONLY the data provided.
- Never invent missing information.
- Do not diagnose diseases or health conditions.
- Do not claim that the user is healthy or unhealthy.
- Do not make predictions about medical outcomes.
- Do not shame or judge the user.
- Do not assume that an increase or decrease is automatically good or bad.
- Use neutral educational language.
- Mention that patterns are based on self-entered observations.
- Keep the response concise: approximately 80–150 words.
- Do not use markdown headings.
- Do not include bullet points.

Focus on observable patterns involving:
sleep, water intake, movement, mood, and energy.

If there are only one or two entries, clearly say that there is not yet enough history to identify a strong pattern.

Return only the overview text.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { entries } = req.body || {};

    if (!Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({
        error: "No wellness entries were provided."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "AI service is not configured."
      });
    }

    // Send only the wellness fields needed for the overview
    const cleanEntries = entries.map(entry => ({
      date: entry.date || entry.id || "Unknown date",
      sleep: entry.sleep,
      water: entry.water,
      movement: entry.movement,
      mood: entry.mood,
      energy: entry.energy
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
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
                  text:
                    WELLNESS_SYSTEM_PROMPT +
                    "\n\nSELF-ENTERED WELLNESS DATA:\n" +
                    JSON.stringify(cleanEntries)
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 350
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Gemini Wellness Overview API error:",
        JSON.stringify(data)
      );

      return res.status(response.status).json({
        error: "Wellness overview is temporarily unavailable."
      });
    }

    const overview =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!overview) {
      return res.status(500).json({
        error: "No wellness overview was returned."
      });
    }

    return res.status(200).json({
      overview: overview.trim()
    });

  } catch (error) {
    console.error("Wellness Overview API error:", error);

    return res.status(500).json({
      error: "Unable to generate wellness overview."
    });
  }
}
