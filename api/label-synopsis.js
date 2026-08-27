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
You are LabelScope AI, an educational food-label interpretation assistant.

Analyze the packaged-food label data below.

IMPORTANT RULES:

- Use ONLY the information provided.
- Never invent missing nutrition values.
- "Not detected" does NOT mean zero.
- Do not diagnose medical conditions.
- Do not give medical advice.
- Do not tell the user whether the food is medically safe or unsafe.
- Do not call the food objectively "healthy" or "unhealthy".
- Do not judge the user's food choices.
- Keep the language neutral, educational and easy to understand.
- Mention serving size when available.
- Ingredient observations must be based only on the supplied ingredients.
- If information is insufficient, clearly say so.
- Do not make assumptions about the user's personal health needs.

Return exactly these four fields:

summary:
A concise 2–4 sentence educational overview of the detected label.

positive:
One useful or potentially favorable observation supported by the detected data.
If there is no meaningful observation, return an empty string.

attention:
One nutritional factor worth noticing or comparing, supported by the detected data.
Do not use fear-based language.
If there is no meaningful observation, return an empty string.

ingredients:
One short educational observation about the detected ingredient list.
If no ingredients were detected, return an empty string.

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
