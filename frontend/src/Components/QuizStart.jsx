import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizStart.css"; // <-- add this line

const QuizStart = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedQuiz = sessionStorage.getItem("currentQuiz");

    if (!storedQuiz) {
      alert("No quiz found! Please start a quiz first.");
      navigate("/quiz/setup");
    } else {
      setQuiz(JSON.parse(storedQuiz));
    }
  }, [navigate]);

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let s = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <h2 className="quiz-title">🧠 Quiz Time!</h2>

        {quiz.length === 0 ? (
          <p className="loading-text">Loading quiz...</p>
        ) : !submitted ? (
          <div className="quiz-section">
            {console.log("gfggfg",quiz)
            }
            {quiz?.map((q, index) => (
              <div key={index} className="question-box">
                <h3 className="question-text">
                  {index + 1}. {q.question}
                </h3>

                <div className="options-grid">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className={`option-label ${
                        answers[index] === opt ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={opt}
                        checked={answers[index] === opt}
                        onChange={() => handleSelect(index, opt)}
                        className="option-input"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="button-center">
              <button onClick={handleSubmit} className="submit-btn">
                Submit Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="result-section">
            <h3 className="score-text">
              ✅ Your Score: {score} / {quiz.length}
            </h3>
            <button
              onClick={() => navigate("/quiz/setup")}
              className="restart-btn"
            >
              Start Another Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizStart;
