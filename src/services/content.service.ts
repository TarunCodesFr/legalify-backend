import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const PRE_PROMPT = `You are an AI assistant tasked with identifying loopholes, logical gaps, inconsistencies, or potential issues in the provided content. Please carefully analyze the following text and highlight any problems you find:

Analyze this legal document and identify:
1. Potential risks and loopholes
2. Unclear or ambiguous clauses
3. Unfavorable terms for the signer
4. Missing standard protections
5. Recommendations for improvement

Return the response in a valid JSON format with the following structure:
{
  "summary": "overall summary",
  "risks": [
    { "clause": "clause name", "risk": "description of risk", "severity": "high" | "medium" | "low" }
  ],
  "recommendations": ["rec 1", "rec 2"]
}
`;

export function generateContent(content: string) {
  const fullPrompt = `${PRE_PROMPT}\n\n${content}`;

  return ai.models
    .generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
    })
    .then(response => {
      const text = response?.text;
      console.log('AI Response:', text);

      if (!text) {
        throw new Error('AI returned an empty response');
      }

      try {
        // Handle both raw string and potential JSON string
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(cleanedText);
      } catch (error) {
        console.warn(
          'Failed to parse AI response as JSON, returning formatted text',
        );
        return {
          summary: text,
          risks: [],
          recommendations: [],
        };
      }
    })
    .catch(error => {
      console.error('Error generating content:', error);
      throw error;
    });
}
