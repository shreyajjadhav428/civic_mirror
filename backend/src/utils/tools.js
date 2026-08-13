import { Type } from '@google/genai';

/**
 * Defines the tools Gemini can call to fetch municipal data.
 */
export const municipalTools = [{
  functionDeclarations: [
    {
      name: 'search_projects',
      description: 'Search the municipal PostgreSQL database for active or planned infrastructure projects.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          pincode: {
            type: Type.STRING,
            description: 'The 6-digit postal code to search within.'
          },
          category: {
            type: Type.STRING,
            description: 'Optional. The category of the project (e.g., "Street Lighting", "Roads", "Water Supply").'
          }
        },
        required: ['pincode']
      }
    }
  ]
}];