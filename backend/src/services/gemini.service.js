import { GoogleGenAI } from '@google/genai';
import { explainableDecisionSchema, decisionComparisonSchema } from '../utils/schemas.js';
import { municipalTools } from '../utils/tools.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are CivicMirror's Governance Intelligence Engine.

You must:
1. Never invent municipal facts.
2. Use supplied evidence as the source of truth.
3. Evaluate resource allocation decisions objectively based on public safety, affected population, and critical infrastructure access (e.g., hospitals, emergency routes).
4. Remain politically neutral.
5. Strictly return response matching the JSON schema provided.`;

export const analyzePromptForTools = async (userPrompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: municipalTools,
        temperature: 0.1
      }
    });
    return response;
  } catch (error) {
    console.error('Gemini Tool API Error:', error);
    throw new Error('Failed to analyze prompt for tools.');
  }
};

export const generateExplainableAnswer = async (userPrompt, municipalEvidence) => {
  try {
    const promptWithEvidence = `
      MUNICIPAL EVIDENCE (Source of Truth):
      ${JSON.stringify(municipalEvidence, null, 2)}
      
      CITIZEN QUESTION:
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
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Gemini Structured Output Error:', error);
    throw new Error('Failed to generate structured intelligence from Gemini.');
  }
};

/**
 * Generates comparative decision intelligence comparing two or more municipal projects.
 */
export const generateDecisionIntelligence = async (comparisonPrompt, projectDataset) => {
  try {
    const promptContent = `
      MUNICIPAL PROJECTS DATASET:
      ${JSON.stringify(projectDataset, null, 2)}

      COMPARISON / PRIORITIZATION QUERY:
      ${comparisonPrompt}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptContent,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: decisionComparisonSchema
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error('Gemini Decision Intelligence Error:', error);
    throw new Error('Failed to generate comparative decision intelligence.');
  }
};