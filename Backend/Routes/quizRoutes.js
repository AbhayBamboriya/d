// backend/Routes/quizRoutes.js
import express from 'express';
import { generateQuizHandler } from '../Controller/quizController.js';
import { isLoggedIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST route to generate quiz
router.post('/generate-quiz', generateQuizHandler);

export default router;
