export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const body = req.body || {};

    // Accept either { label: ... } or { data: ... }
    const label = body.label || body.data;

    if (!label || typeof label !== 'object') {
      return res.status(400).json({
        error: 'No label data was provided.'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing.');

      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured in Vercel.'
      });
    }

    const labelData = {
      product: label.product ?? 'Not detected',
      serving: label.serving ?? 'Not detected',
      calories: label.calories ?? 'Not detected',
      protein: label.protein ?? 'Not detected',
      carbohydrates: label.carbs ?? 'Not detected',
      sugars: label.sugars ?? 'Not detected',
      fat: label.fat ?? 'Not detected',
      saturatedFat: label.satFat ?? 'Not detected',
      sodium: label.sodium ?? 'Not detected',
      fiber: label.fiber ?? 'Not detected',

      ingredients: Array.isArray(label.ingredients)
        ? label.ingredients
        : []
    };

    const prompt = `
You are LabelScope AI inside HealthScope.

Create a short, accurate, educational explanation of the packaged-food label below.

IMPORTANT:

- Use ONLY the supplied label data.
- Never invent missing information.
- Never assume that "Not detected" means zero.
- Never correct or guess OCR values.
- Treat detected values as information listed by the scanned label.
- Do not diagnose.
- Do not give individualized medical advice.
- Do not call the food objectively healthy or unhealthy.
- Do not judge the user's food choice.
- Avoid fear-based language.

SERVING SIZE RULE:

The serving field may be incomplete.

If it is only a number such as "3.3" without a clear unit, DO NOT say:
"per 3.3 serving"
"per 3.3 grams"
"per 3.3 pieces"

Instead say:
"the detected serving information"

NUTRITION RULE:

When mentioning a nutrient, use wording such as:

"The scanned label lists..."

or:

"The detected label information shows..."

Do not present OCR-derived information as independently verified laboratory data.

Create four short sections:

1. summary
A concise 2–4 sentence overview.

2. positive
One useful or potentially favorable observation supported by the detected label data.
If none exists, return an empty string.

3. attention
One important label factor worth noticing.
If none exists, return an empty string.

4. ingredients
One concise educational observation about the ingredient list.

Do not make health claims about individual ingredients simply because they appear on the label.

LABEL DATA:

${JSON.stringify(labelData, null, 2)}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],

          generationConfig: {
            responseMimeType: 'application/json',

            responseSchema: {
              type: 'object',

              properties: {
                summary: {
                  type: 'string'
                },

                positive: {
                  type: 'string'
                },

                attention: {
                  type: 'string'
                },

                ingredients: {
                  type: 'string'
                }
              },

              required: [
                'summary',
                'positive',
                'attention',
                'ingredients'
              ]
            }
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(
        'Gemini API returned an error:',
        JSON.stringify(result, null, 2)
      );

      return res.status(500).json({
        error:
          result?.error?.message ||
          'Gemini could not generate the synopsis.'
      });
    }

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error(
        'Gemini returned no text:',
        JSON.stringify(result, null, 2)
      );

      return res.status(500).json({
        error: 'Gemini returned an empty response.'
      });
    }

    let synopsis;

    try {
      synopsis = JSON.parse(text);
    } catch (parseError) {
      console.error(
        'Gemini JSON parsing failed:',
        text,
        parseError
      );

      return res.status(500).json({
        error: 'Gemini returned invalid JSON.'
      });
    }

    return res.status(200).json({
      data: {
        summary:
          typeof synopsis.summary === 'string'
            ? synopsis.summary
            : '',

        positive:
          typeof synopsis.positive === 'string'
            ? synopsis.positive
            : '',

        attention:
          typeof synopsis.attention === 'string'
            ? synopsis.attention
            : '',

        ingredients:
          typeof synopsis.ingredients === 'string'
            ? synopsis.ingredients
            : ''
      }
    });

  } catch (error) {
    console.error(
      'LabelScope AI endpoint crashed:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Something went wrong while generating the synopsis.'
    });
  }
}
