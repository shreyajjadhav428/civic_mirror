import { GoogleGenAI } from '@google/genai';
import { explainableDecisionSchema, decisionComparisonSchema } from '../utils/schemas.js';
import { municipalTools } from '../utils/tools.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are CivicMirror's Governance Intelligence Engine.

Core Operational Rules:
1. Never invent or hallucinate municipal projects, timelines, budgets, or department actions.
2. Use ONLY the supplied municipal evidence (projects and documents) as your source of truth.
3. Scenario A (Active Project Match): If an active project matches the citizen's inquiry in that pincode (e.g. projects array is non-empty), reassure the citizen. State the project code (reference_id), current progress percentage, expected completion date, department, and budget details clearly. Set status to "In Progress" or "Active Project Match" and set isUniqueRequest to FALSE.
4. Scenario B (No Active Project): If no relevant active project exists in the evidence (projects array is empty), explicitly set status to "Under Review". Set isUniqueRequest to TRUE. State clearly that no sanctioned project currently exists in that pincode for this category, and explicitly reassure the citizen that their query has been registered as a unique request and sent to the Municipal Admin Dashboard for officer review.
5. Identify and set detectedPincode (6-digit postal code) and detectedCategory (e.g., Street Lighting, Roads, Water Supply, Sanitation, Public Parks).
6. Maintain a neutral, reassuring, professional, and transparent public-service tone.
7. Return strictly valid JSON conforming to the requested schema.`;

export const analyzePromptForTools = async (userPrompt) => {
  const modelsToTry = ['Gemini 3.1 Flash Lite'];
  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: municipalTools,
          temperature: 0.1
        }
      });
      return response;
    } catch (error) {
      if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
        console.warn(`Model ${model} hit rate limit (429), switching to grounded fallback...`);
        break;
      }
      console.error(`Gemini Tool API Error on model ${model}:`, error.message);
    }
  }
  return { functionCalls: [] };
};

export const generateExplainableAnswer = async (userPrompt, municipalEvidence) => {
  const modelsToTry = ['gemini-3.6-flash'];
  const promptWithEvidence = `
    MUNICIPAL EVIDENCE (Source of Truth):
    ${JSON.stringify(municipalEvidence, null, 2)}
    
    CITIZEN QUESTION:
    ${userPrompt}
  `;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: promptWithEvidence,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: explainableDecisionSchema
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
        console.warn(`Model ${model} rate limited (429), generating grounded fallback...`);
        break;
      }
      console.error(`Gemini Structured Output Error on ${model}:`, error.message);
    }
  }

  // Grounded fallback if API quotas are exhausted
  const isProjectAvailable = municipalEvidence?.projects?.length > 0;
  if (isProjectAvailable) {
    const p = municipalEvidence.projects[0];
    return {
      summary: `Active project ${p.reference_id || p.project_code || 'EL-204'} (${p.title || 'Infrastructure Work'}) is currently in progress.`,
      reason: `Municipal project records confirm active progress for this area.`,
      status: p.status || "In Progress",
      priority: "High",
      expectedAction: `Execution by ${p.department || 'Municipal Department'}.`,
      estimatedTimeline: `Completion expected by ${p.expected_completion || 'scheduled timeline'}.`,
      isUniqueRequest: false,
      evidence: [{ reference_id: p.reference_id || p.project_code || 'EL-204', detail: `${p.title || 'Project'} in progress (${p.progress_percentage || 0}%)` }]
    };
  } else {
    return {
      summary: `No active municipal project found for this issue in the specified pincode.`,
      reason: `A search of municipal records returned zero active or sanctioned projects. Your query has been logged as a unique request and sent to the Municipal Admin Dashboard for officer review.`,
      status: "Under Review",
      priority: "High",
      expectedAction: "Registered as unique request and routed to Municipal Admin Dashboard.",
      estimatedTimeline: "Pending administrative review",
      isUniqueRequest: true,
      evidence: []
    };
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
      model: 'Gemini 3.1 Flash Lite',
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