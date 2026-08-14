import { Type } from '@google/genai';

export const explainableDecisionSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    reason: { type: Type.STRING },
    status: { type: Type.STRING },
    priority: { type: Type.STRING },
    expectedAction: { type: Type.STRING },
    estimatedTimeline: { type: Type.STRING },
    isUniqueRequest: { 
      type: Type.BOOLEAN, 
      description: "True if no matching active project exists in the municipal evidence for this pincode/issue." 
    },
    isSpam: {
      type: Type.BOOLEAN,
      description: "True if the user input is spam, casual chatter, greeting ('hi', 'hello'), test input, or unrelated non-civic input."
    },
    detectedPincode: { 
      type: Type.STRING, 
      description: "The 6-digit postal pincode identified in the prompt." 
    },
    detectedCategory: { 
      type: Type.STRING, 
      description: "The municipal category identified (e.g., Street Lighting, Roads, Water Supply, Sanitation, Public Parks)." 
    },
    evidence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          reference_id: { type: Type.STRING },
          detail: { type: Type.STRING }
        },
        required: ["reference_id", "detail"]
      }
    }
  },
  required: ["summary", "reason", "status", "priority", "expectedAction", "estimatedTimeline", "isUniqueRequest", "isSpam", "evidence"]
};

/**
 * Schema for Comparative Decision Intelligence (Officer & Citizen Priority Explanations)
 */
export const decisionComparisonSchema = {
  type: Type.OBJECT,
  properties: {
    recommendation: { 
      type: Type.STRING, 
      description: "Clear, neutral recommendation on which project or issue should take precedence." 
    },
    primaryReason: { 
      type: Type.STRING, 
      description: "The core driving factor behind the prioritization decision." 
    },
    comparisons: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          project_code: { type: Type.STRING },
          title: { type: Type.STRING },
          location: { type: Type.STRING },
          safety_risk_level: { type: Type.STRING, description: "e.g., High, Medium, Low" },
          affected_population: { type: Type.STRING },
          hospital_access_impact: { type: Type.BOOLEAN },
          priority_score: { type: Type.STRING, description: "Relative priority designation, e.g., 'High Priority', 'Secondary'" }
        },
        required: ["project_code", "title", "location", "safety_risk_level", "affected_population", "priority_score"]
      }
    },
    keyTradeOffs: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of explicit trade-offs associated with this decision."
    },
    evidence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          reference_id: { type: Type.STRING },
          detail: { type: Type.STRING }
        },
        required: ["reference_id", "detail"]
      }
    }
  },
  required: ["recommendation", "primaryReason", "comparisons", "keyTradeOffs", "evidence"]
};