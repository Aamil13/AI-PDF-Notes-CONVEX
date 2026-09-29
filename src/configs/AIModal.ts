import { GoogleGenAI } from '@google/genai';

/**
 * Fetches available Gemini models from the Google API.
 * @returns {Promise<Array<{id: string, name: string}>>} - List of available models.
 */
export async function getAvailableGeminiModels(): Promise<Array<{id: string, name: string}>> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY environment variable.');
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const modelsPager = await ai.models.list();
    
    // Convert pager to array and filter for text generation models
    const models = [];
    for await (const model of modelsPager) {
      // Check if it's a Gemini model by name
      if (model.name && (model.name.includes('gemini') || model.name.includes('chat'))) {
        models.push({
          id: model.name,
          name: model.displayName || model.name
        });
      }
    }

    return models;
  } catch (error: any) {
    console.error('Error fetching Gemini models:', error);
    // Fallback to basic models if API call fails
    return [
      { id: 'gemini-2.5-flash', name: 'Gemini 1.5 Flash' },
    ];
  }
}

/**
 * Generates an AI answer using Google's Gemini API.
 *
 * @param {string} prompt - The prompt or question to send to Gemini.
 * @param {string} [model='gemini-2.5-flash'] - Optional model name.
 * @returns {Promise<string>} - The AI-generated response text.
 */
export async function generateGeminiAnswer(
  prompt: string,
  model = 'gemini-2.5-flash'
): Promise<string> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY environment variable.');
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const aiResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return aiResponse.trim();
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Check for 503 service unavailable error
    if (error.message?.includes('503') || error.message?.includes('high demand') || error.message?.includes('UNAVAILABLE')) {
      return '⚠️ Google AI service is currently experiencing high demand. Please try again in a few minutes.';
    }
    
    return '⚠️ An error occurred while generating the answer.';
  }
}
