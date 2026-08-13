import { GoogleGenAI } from '@google/genai';
import { explainableDecisionSchema } from '../utils/schemas.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are CivicMirror's Governance Intelligence Engine.

You must:
1. Never invent municipal facts.
2. Use supplied evidence as the source of truth.
3. Distinguish facts from inference.
4. Say when evidence is insufficient.
5. Never claim an issue is resolved without evidence.
6. Remain politically neutral.
7. Cite supporting evidence.
8. Strictly return response matching the JSON schema provided.`;

/**
 * Generates structured JSON intelligence by reasoning over municipal database evidence.
 */
export const generateExplainableAnswer = async (userPrompt, municipalEvidence) => {
  try {
    const promptWithEvidence = `
      MUNICIPAL EVIDENCE (Source of Truth):
      ${JSON.stringify(municipalEvidence, null, 2)}
      
      CITIZEN QUESTION / COMPLAINT:
      ${userPrompt}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptWithEvidence,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: explainableDecisionSchema
      }
    });
    
    // Parse the guaranteed JSON string into a JavaScript Object
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Gemini Structured Output Error:', error);
    throw new Error('Failed to generate structured intelligence from Gemini.');
  }
};