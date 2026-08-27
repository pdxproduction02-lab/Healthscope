export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { label } = req.body || {};

    if (!label || typeof label !== 'object') {
      return res.status(400).json({
        error: 'Label data is required.'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured.');

      return res.status(500).json({
        error: 'Gemini AI is not configured.'
      });
    }

    /*
     * Keep only structured information detected by the scanner.
     * Missing values remain explicitly unknown.
     */

    const labelData = {
      product:
        label.product ?? 'Not detected',

      serving:
        label.serving ?? 'Not detected',

      calories:
        label.calories ?? 'Not detected',

      protein:
        label.protein ?? 'Not detected',

      carbohydrates:
        label.carbs ?? 'Not detected',

      sugars:
        label.sugars ?? 'Not detected',

      fat:
        label.fat ?? 'Not detected',

      saturatedFat:
        label.satFat ?? 'Not detected',

      sodium:
        label.sodium ?? 'Not detected',

      fiber:
        label.fiber ?? 'Not detected',

      ingredients:
        Array.isArray(label.ingredients)
          ? label.ingredients
          : []
    };

    const prompt = `
You are LabelScope AI, an educational food-label interpretation assistant.

Your task is to explain the packaged-food label information detected by an image-analysis system.

IMPORTANT ACCURACY RULES:

1. Use ONLY the information supplied in LABEL DATA.
2. Never invent, estimate, correct, or complete missing values.
3. "Not detected" means the information is unknown. It does NOT mean zero.
4. Treat OCR/image-extracted information as "listed by the scanned label", not as independently verified laboratory data.
5. If a serving-size value appears incomplete, ambiguous, or lacks a unit, do NOT interpret what the unit or quantity means.
6. Never assume that a number represents grams, pieces, servings, millilitres, etc. unless the supplied data explicitly says so.
7. Do not calculate percentages of daily values unless those values are explicitly supplied.
8. Do not diagnose medical conditions.
9. Do not give individualized medical or dietary advice.
10. Do not call a food objectively "healthy" or "unhealthy".
11. Do not judge the user's food choices.
12. Do not use fear-based language.
13. Do not infer ingredients that are not listed.
14. Ingredient explanations should remain general and educational.
15. If the information is insufficient to make a meaningful observation, say so.
16. Keep the response concise and easy to understand.

SERVING-SIZE RULE:

If the serving value is something like "3.3" without a clearly stated unit, refer to it as:

"the serving information shown on the scanned label"

Do NOT write:

"per 3.3 serving"

or assume that 3.3 means grams, pieces, servings, ounces, etc.

NUTRITION WORDING RULE:

When discussing a detected nutrient value, prefer wording such as:

"The scanned label lists..."

or

"The detected label information shows..."

Do not present OCR-derived information as independently verified fact.

For example:

GOOD:
"The scanned label lists 75.6 g of sugars in the detected nutrition information."

BAD:
"The product contains exactly 75.6 g of sugar."

GOOD:
"The label lists 0.4 g of fat."

BAD:
"This food has only 0.4 g of fat and is therefore healthy."

Return ONLY valid JSON with exactly these four string fields:

{
  "summary": "...",
  "positive": "...",
  "attention": "...",
  "ingredients": "..."
}

FIELD GUIDANCE:

summary:
Write a concise 2–4 sentence educational overview.

Mention the product name when available.

Mention the serving information only when it is sufficiently clear.

Describe notable detected nutrition values using cautious label-based wording.

positive:
Mention one useful or potentially favorable observation supported by the detected data.

Examples may include:
- fiber is listed
- protein is present
- sodium is relatively lower compared with other detected signals
- a nutrient is present in a meaningful amount

Do not call the food healthy.

If no meaningful positive observation can be made, return an empty string.

attention:
Mention one nutritional factor worth noticing or comparing, supported by detected data.

Examples may include:
- sugars are relatively prominent
- sodium is relatively higher
- saturated fat is detected
- fiber is not listed

Do not use alarmist language.

If no meaningful observation can be made, return an empty string.

ingredients:
Give one short educational observation about the detected ingredient list.

You may describe:
- major ingredient groups
- sweeteners
- oils
- stabilizers
- flavorings
- colors
- fruit components
- allergens when explicitly listed

Do not make health claims about an ingredient simply because it appears on the list.

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
      console.error('Gemini API error:', result);

      return res.status(500).json({
        error: 'Gemini could not generate the synopsis.'
      });
    }

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('Gemini returned no text:', result);

      return res.status(500).json({
        error: 'Gemini returned an empty response.'
      });
    }

    let synopsis;

    try {
      synopsis = JSON.parse(text);
    } catch (error) {
      console.error(
        'Could not parse Gemini JSON:',
        text,
        error
      );

      return res.status(500).json({
        error: 'Gemini returned invalid synopsis data.'
      });
    }

    const cleanSynopsis = {
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
    };

    return res.status(200).json({
      data: cleanSynopsis
    });

  } catch (error) {
    console.error(
      'LabelScope synopsis server error:',
      error
    );

    return res.status(500).json({
      error: 'Something went wrong while generating the synopsis.'
    });
  }
}
