import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Converts a text string into a vector embedding using the foundational Gemini text-embedding model.
 */
export const generateEmbedding = async (text) => {
  try {
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001', 
      contents: text,
      config: {
        // Force the API to truncate the default 3072 dimensions down to 768
        outputDimensionality: 768 
      }
    });
    
    return response.embeddings[0].values;
  } catch (error) {
    console.error('Embedding API Error:', error);
    throw new Error('Failed to generate vector embedding.');
  }
};