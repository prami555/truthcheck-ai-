
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Calls the Gemini API to fact-check a given statement.
 * @param statement The statement to be fact-checked.
 * @returns The full GenerateContentResponse from the API.
 */
export const getFactCheck = async (statement: string): Promise<GenerateContentResponse> => {
    try {
        const prompt = `You are a world-class fact-checking AI. Your goal is to provide a clear, unbiased, and accurate analysis of the user's statement. First, provide a one-word verdict from this list: 'True', 'False', 'Misleading', 'Partially True', 'Unverifiable'. Then, on a new line, write a concise but comprehensive explanation for your verdict. Use your search capabilities to find and cite reliable sources to support your analysis. Do not add any extra formatting or conversational text. Statement: "${statement}"`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                temperature: 0.2,
            },
        });

        return response;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get fact check from Gemini API: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching the fact check.");
    }
};
