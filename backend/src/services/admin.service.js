import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const adminInsightSchema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.STRING,
      description: "High-level summary of active civic issues and complaint density."
    },
    rootCauseAnalysis: {
      type: Type.STRING,
      description: "Identified systemic root cause behind recurring citizen complaints."
    },
    recommendedAction: {
      type: Type.STRING,
      description: "Actionable recommendation for municipal officials to resolve the cluster efficiently."
    },
    priorityLevel: {
      type: Type.STRING,
      description: "'Critical', 'High', 'Medium', or 'Low'"
    }
  },
  required: ["executiveSummary", "rootCauseAnalysis", "recommendedAction", "priorityLevel"]
};

/**
 * Generates administrative insights over a cluster of citizen complaints.
 */
export const generateAdminClusterInsights = async (clusterData) => {
  try {
    const prompt = `
      MUNICIPAL COMPLAINT CLUSTER DATA:
      ${JSON.stringify(clusterData, null, 2)}

      Provide administrative governance intelligence and a root cause analysis for municipal officials based on this cluster.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are CivicMirror's Administrative Governance Intelligence Engine. Provide actionable, politically neutral, evidence-backed insights for municipal leaders.",
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