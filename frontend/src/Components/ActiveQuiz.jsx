// frontend/src/Components/ActiveQuiz.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveQuiz = () => {
  const navigate = useNavigate();
  
  // State for the entire quiz data, current question index, user answers, and completion status
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Load quiz data from sessionStorage when the component mounts
  useEffect(() => {
    const storedQuiz = sessionStorage.getItem('currentQuiz');
    if (storedQuiz) {
      try {
        const parsedQuiz = JSON.parse(storedQuiz);
        // ⭐ Check if the data is an array of questions
        if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
            setQuiz(parsedQuiz);
        } else {
            // Handle case where API returned success but empty/malformed data
            alert("Quiz data is empty or corrupted. Starting over.");
            navigate('/quiz/setup'); 
        }
      } catch (e) {
        console.error("Failed to parse quiz data:", e);
        navigate('/quiz/setup'); 
      }
    } else {
      // Redirect if no quiz data is found
      alert("No quiz found! Please set up a quiz first.");
      navigate('/quiz/setup');
    }
  }, [navigate]);

  // Handler for option selection
  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: optionIndex, // Store the index of the chosen option
    });
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Final score calculation
  const calculateScore = () => {
    let finalScore = 0;
    quiz.forEach((q, index) => {
      // Compare user's selected index with the correct_answer index from the AI data
      if (userAnswers[index] === q.correct_answer) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setQuizCompleted(true);
    sessionStorage.removeItem('currentQuiz'); // Clean up temporary data
    
    // TODO: Add API call here to save final score to your backend database
  };

  if (quiz.length === 0) {
    return <div style={styles.container}>Loading Quiz...</div>;
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.length - 1;
  const selectedAnswer = userAnswers[currentQuestionIndex];

  // --- Quiz Results Display ---
  if (quizCompleted) {
    return (
      <div style={styles.resultsContainer}>
        <h2>🎉 Quiz Completed!</h2>
        <p>You scored **{score} out of {quiz.length}**.</p>
        <p>{score / quiz.length > 0.7 ? "Great job!" : "Keep studying!"}</p>
        <button 
          onClick={() => navigate('/quiz/setup')} 
          style={{ ...styles.button, backgroundColor: '#28a745' }}
        >
          Start New Quiz
        </button>
      </div>
    );
  }

  // --- Active Quiz Display ---
  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Question {currentQuestionIndex + 1} of {quiz.length}</h3>
      <div style={styles.questionBox}>
        <p style={styles.questionText}>{currentQuestion.question}</p>
      </div>

      <div style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            // Use inline styles, replace with your Tailwind classes
            style={{
              ...styles.optionButton,
              backgroundColor: selectedAnswer === index ? '#add8e6' : 'white', 
            }}
          >
            {`${String.fromCharCode(65 + index)}. ${option}`}
          </button>
        ))}
      </div>

      <div style={styles.navigation}>
        <button 
          onClick={handlePrevious} 
          disabled={currentQuestionIndex === 0}
          style={styles.button}
        >
          Previous
        </button>
        
        {isLastQuestion ? (
          <button 
            onClick={calculateScore} 
            style={{ ...styles.button, backgroundColor: '#ffc107', color: 'black' }}
            disabled={selectedAnswer === undefined}
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            style={styles.button}
            disabled={selectedAnswer === undefined}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveQuiz;

// Simple inline styles (Please replace these with your actual CSS/Tailwind classes)
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  resultsContainer: {
    textAlign: 'center',
    padding: '40px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '20px',
  },
  questionBox: {
    marginBottom: '30px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  questionText: {
    fontSize: '1.1em',
    fontWeight: 'bold',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionButton: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  navigation: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
  }
};