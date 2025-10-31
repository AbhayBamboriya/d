import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Helper/axiosInstance";
import "./QuizSetup.css";
import Slidebar from "./Slidebar.jsx";

const QuizSetup = () => {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleStartQuiz = async (e) => {
    e.preventDefault();
    setError(null);
    if (!topic || numQuestions < 1) {
      alert("Please enter a topic and a valid number of questions.");
      return;
    }

    setLoading(true);
    const requestData = { topic, numQuestions };

    try {
      const response = await axiosInstance.post("/quiz/generate-quiz", requestData);
      console.log("Quiz API response:", response.data);
      sessionStorage.setItem("currentQuiz", JSON.stringify(response.data));
      navigate("/quiz/start");
    } catch (err) {
      console.error("Quiz generation error:", err);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sidebar (optional) */}
      {/* <Slidebar /> */}

      <div className="quiz-container">
        <div className="quiz-box">
          <div className="quiz-header">
            <button className="back-btn" onClick={() => navigate("/")}>
              ⬅ Back
            </button>
            <h2 className="quiz-title">🎯 Start a New Quiz</h2>
          </div>

          <form onSubmit={handleStartQuiz} className="quiz-form">
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. React Hooks, Quantum Physics"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numQuestions">Number of Questions (Max 20)</label>
              <input
                type="number"
                id="numQuestions"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="generate-btn">
              {loading ? "🌀 Generating Quiz..." : "Generate & Start Quiz"}
            </button>

            {loading && (
              <p className="loading-text">
                🌀 Generating quiz... this may take up to 30 seconds.
              </p>
            )}

            {error && <p className="error-text">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default QuizSetup;
