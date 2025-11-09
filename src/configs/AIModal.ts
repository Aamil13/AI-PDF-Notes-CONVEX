import { GoogleGenAI } from '@google/genai';

/**
 * Generates an AI answer using Google's Gemini API.
 *
 * @param {string} prompt - The prompt or question to send to Gemini.
 * @param {string} [model='gemini-2.0-flash-lite'] - Optional model name.
 * @returns {Promise<string>} - The AI-generated response text.
 */
export async function generateGeminiAnswer(
  prompt: string,
  model = 'gemini-2.0-flash-lite'
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
    return '⚠️ An error occurred while generating the answer.';
  }
}
