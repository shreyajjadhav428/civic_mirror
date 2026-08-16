import 'dotenv/config';
import { GoogleGenAI, Type } from '@google/genai';

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const adminInsightSchema = {
  type: Type.OBJECT,
  properties: {
    root_cause: {
      type: Type.STRING,
      description: "Identified systemic root cause behind the recurring citizen complaints in this cluster."
    },
    recommendation: {
      type: Type.STRING,
      description: "Concrete, actionable administrative recommendation for municipal officials."
    },
    reasoning: {
      type: Type.STRING,
      description: "Governance, budget efficiency, and infrastructure reasoning supporting the recommendation."
    },
    why_factors: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 to 4 concise bullet points explaining why this cluster is critical and what factors contribute to it."
    },
    priority_level: {
      type: Type.STRING,
      description: "'Critical', 'High', 'Medium', or 'Low'"
    },
    executive_summary: {
      type: Type.STRING,
      description: "High-level summary of active civic issues and complaint density in this area."
    }
  },
  required: ["root_cause", "recommendation", "reasoning", "why_factors", "priority_level", "executive_summary"]
};

/**
 * Generates administrative insights over a cluster of citizen complaints.
 */
export const generateAdminClusterInsights = async (clusterData) => {
  try {
    const prompt = `
      MUNICIPAL COMPLAINT CLUSTER DATA:
      ${JSON.stringify(clusterData, null, 2)}

      Provide administrative governance intelligence, root cause analysis, evidence-backed why factors, and actionable recommendations for municipal officials based on this cluster.
    `;

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are CivicMirror's Administrative Governance Intelligence Engine. Provide actionable, politically neutral, evidence-backed insights and root causes for municipal leaders.",
        responseMimeType: 'application/json',
        responseSchema: adminInsightSchema
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error('Error generating admin insights:', error);
    throw new Error('Failed to generate administrative insights.');
  }
};