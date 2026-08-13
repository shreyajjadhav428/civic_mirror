import { Type } from '@google/genai';

/**
 * Schema for the Explainable Decision Cards required by the React frontend.
 */
export const explainableDecisionSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise 1-2 sentence summary of the issue and current standing."
    },
    reason: {
      type: Type.STRING,
      description: "A clear explanation of why the situation is as it currently stands based on municipal evidence."
    },
    status: {
      type: Type.STRING,
      description: "Current status of the work (e.g., 'In Progress', 'Pending Admin Review', 'Scheduled')."
    },
    priority: {
      type: Type.STRING,
      description: "Priority classification ('Low', 'Medium', 'High', 'Critical')."
    },
    expectedAction: {
      type: Type.STRING,
      description: "Next concrete action being taken by the municipality."
    },
    estimatedTimeline: {
      type: Type.STRING,
      description: "Expected resolution date or timeframe (e.g., 'August 18, 2026')."
    },
    evidence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "Type of evidence, e.g., 'Project', 'Budget', 'Work Order'" },
          code: { type: Type.STRING, description: "Project or document reference code, e.g., 'EL-204'" },
          detail: { type: Type.STRING, description: "Specific factual detail supporting the decision." }
        },
        required: ["type", "code", "detail"]
      },
      description: "List of concrete municipal records used as evidence."
    }
  },
  required: [
    "summary",
    "reason",
    "status",
    "priority",
    "expectedAction",
    "estimatedTimeline",
    "evidence"
  ]
};