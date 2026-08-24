const LABEL_SYSTEM_PROMPT = `
You are LabelScope AI, an educational packaged-food label reader.

Your task is to examine a food package image and extract information that is actually visible on the label.

IMPORTANT RULES:
- Do not invent information that is not visible.
- If text is unclear or unreadable, use "Not detected".
- Do not diagnose health conditions.
- Do not claim a food is universally healthy or unhealthy.
- This is educational food-label information only.

INGREDIENT EXPLANATIONS:

For EVERY detected ingredient, return:
- name: the ingredient name as written or clearly normalized from the label.
- explanation: a short, neutral educational explanation of what the ingredient generally is and/or its common role in food.

This must work for ANY ingredient detected on a packaged-food label.

Ingredients may include:
- whole foods
- fruits or vegetables
- grains and flours
- oils and fats
- sugars and sweeteners
- dairy ingredients
- vitamins and minerals
- preservatives
- emulsifiers
- stabilizers
- thickeners
- acidity regulators
- raising agents
- flavourings
- colours
- additives and INS/E numbers

Do not automatically describe ingredients as healthy, unhealthy, toxic, dangerous, or safe for everyone.

Do not invent a specific function when uncertain. Use neutral wording such as:
"commonly used for..."
"may help provide..."
"generally contributes..."

Keep each explanation concise, usually one sentence.

Return ONLY valid JSON.
No markdown.
No explanations outside JSON.

Use exactly this structure:

{
  "product": "Product name or Not detected",
  "serving": "Serving size or Not detected",
  "calories": "number or Not detected",
  "protein": "number or Not detected",
  "carbs": "number or Not detected",
  "sugars": "number or Not detected",
  "fat": "number or Not detected",
  "satFat": "number or Not detected",
  "sodium": "number or Not detected",
  "fiber": "number or Not detected",
  "ingredients": [
    {
      "name": "Ingredient name",
      "explanation": "Short neutral educational explanation"
    }
  ]
}

Return numbers WITHOUT units because the HealthScope interface already adds units.

If ingredients are not visible, return an empty array [].
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { image } = req.body || {};

    if (!image || typeof image !== "string") {
      return res.status(400).json({
        error: "Please provide a label image."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "AI service is not configured."
      });
    }

    // Convert the browser Data URL into Gemini-compatible base64 data
    const matches = image.match(/^data:(.+);base64,(.+)$/);

    if (!matches) {
      return res.status(400).json({
        error: "Invalid image format."
      });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

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
                  text: LABEL_SYSTEM_PROMPT
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Gemini Label API error:",
        JSON.stringify(data)
      );

      return res.status(response.status).json({
        error: "Label analysis is temporarily unavailable."
      });
    }

    const rawText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({
        error: "No readable label information was returned."
      });
    }

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Label JSON parse error:", rawText);

      return res.status(500).json({
        error: "The label result could not be processed."
      });
    }

    // Ensure the UI always receives safe values
    const safeData = {
  product: parsed.product || "Not detected",
  serving: parsed.serving || "Not detected",
  calories: parsed.calories || "Not detected",
  protein: parsed.protein || "Not detected",
  carbs: parsed.carbs || "Not detected",
  sugars: parsed.sugars || "Not detected",
  fat: parsed.fat || "Not detected",
  satFat: parsed.satFat || "Not detected",
  sodium: parsed.sodium || "Not detected",
  fiber: parsed.fiber || "Not detected",

  ingredients: Array.isArray(parsed.ingredients)
    ? parsed.ingredients
        .map(item => {
          if (item && typeof item === 'object' && item.name) {
            return {
              name: String(item.name),
              explanation: item.explanation
                ? String(item.explanation)
                : 'General function may vary depending on the product formulation.'
            };
          }

          if (typeof item === 'string') {
            return {
              name: item,
              explanation: 'General function may vary depending on the product formulation.'
            };
          }

          return null;
        })
        .filter(Boolean)
    : []
};

    return res.status(200).json({
      data: safeData,
      source: "gemini-vision"
    });

    } catch (error) {
    console.error("LabelScope AI error:", error);

    return res.status(500).json({
      error: "Label analysis failed."
    });
  }
}
