
// import { generateQuiz } from './backend/utils/geminiAPI.js';

import { generateQuiz } from "../utils/geminiAPI.js";


export const generateQuizHandler = async (req, res) => {
    // 1. Get topic and numQuestions from the request body
    const { topic, numQuestions } = req.body;
    console.log('req',req.body);
    
    // 2. Basic validation
    if (!topic || !numQuestions) {
        // Send a 400 Bad Request error if data is missing
        return res.status(400).json({ error: 'Both "topic" and "numQuestions" are required.' });
    }

    // 3. Use a try...catch block to handle potential errors during quiz generation
    try {
        console.log(`Generating a ${numQuestions}-question quiz about "${topic}"...`);

        // 4. Call the async generateQuiz function and wait for the result
        // Note: parseInt is used to ensure numQuestions is a number
        const quiz = await generateQuiz(topic, parseInt(numQuestions, 10));

        // 5. Send the generated quiz back to the client with a 200 OK status
        res.status(200).json(quiz);

    } catch (error) {
        // If an error occurs, log it for debugging purposes
        console.error("Error in quiz generation route:", error);
        
        // 6. Send a generic 500 Internal Server Error response to the client
        res.status(500).json({ error: 'An unexpected error occurred while generating the quiz.' });
    }
};
