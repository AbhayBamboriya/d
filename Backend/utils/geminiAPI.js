// Backend/utils/geminiAPI.js

// 1. Convert SDK Import from CommonJS require() to ES Module import
// const { GoogleGenAI } = require('@google/genai'); 
import { GoogleGenAI } from '@google/genai'; // 👈 Use import


const API_KEY = process.env.GEMINI_API_KEY;

// ⭐ 2. Immediately check if the key is missing
if (!API_KEY) {
    // If the key is missing, throw a clear error immediately
    throw new Error("FATAL ERROR: GEMINI_API_KEY is not defined in environment variables.");
}

// Ensure you are correctly initializing the client in your environment
// You might need to adjust this based on how your SDK version is set up, 
// but assuming GoogleGenAI is the correct class:
const google = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const generateQuiz = async (topic, numQuestions) => {
    // ... (rest of your generateQuiz function code) ...
    const prompt = `Generate a challenging multiple-choice quiz about "${topic}" with exactly ${numQuestions} questions...`;

    try {
        const response = await google.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Gemini API Quiz Generation Error:", error);
        throw new Error("Failed to generate quiz from AI.");
    }
};

// 2. Convert CommonJS export to ES Module Named Export
// OLD: module.exports = { generateQuiz };
export { generateQuiz }; // 👈 This provides the named export 'generateQuiz'