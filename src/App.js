// App.js
import React, { useState, useEffect } from "react";
import questionsData from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(300); // 5 min

  // Shuffle questions when app loads
  useEffect(() => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  // Timer
  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [started]);

  // Handle answer click
  function handleAnswer(option) {
    if (option === questions[current].answer) setScore((prev) => prev + 1);
    setCurrent((prev) => prev + 1);
  }

  // Restart quiz
  function restart() {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setTime(300);
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }

  // Start screen
  if (!started) {
    return (
      <div className="container text-center mt-5">
        <div className="card shadow-lg p-5">
          <h1 className="mb-4">🧠 AI IQ Test</h1>
          <p className="fs-5">Test your intelligence with professional cognitive questions.</p>
          <p>⏱ Time Limit: 5 minutes <br />📊 Questions: {questionsData.length}</p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => setStarted(true)}
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  // Result screen
  if (current >= questions.length || time <= 0) {
    const percentage = score / questions.length;
    const iq = Math.round(70 + percentage * 80);

    let level = "";
    if (iq >= 140) level = "🧠 Genius";
    else if (iq >= 120) level = "🔥 Very Intelligent";
    else if (iq >= 100) level = "👍 Average Intelligence";
    else if (iq >= 85) level = "📘 Below Average";
    else level = "📚 Needs Improvement";

    return (
      <div className="container text-center mt-5">
        <div className="card shadow-lg p-5 result-card">
          <h1 className="mb-4 text-success">🎉 Your IQ Score</h1>
          <h2 className="display-2 text-primary">{iq}</h2>
          <h4 className="mb-3">{level}</h4>
          <p className="fs-4">Correct Answers: {score} / {questions.length}</p>

          <div className="d-flex justify-content-center flex-wrap mt-4 gap-2">
            <button className="btn btn-warning" onClick={restart}>Try Again</button>
            <a
              href={`https://twitter.com/intent/tweet?text=I scored ${iq} IQ on this AI IQ Test!`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-info"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 quiz-card">
        <h2 className="mb-3 text-primary">
          Question {current + 1} / {questions.length}
        </h2>

        <h5 className="text-danger mb-3">⏱ Time Left: {time}s</h5>

        <div className="progress mb-4">
          <div
            className="progress-bar bg-success"
            style={{ width: `${(current / questions.length) * 100}%` }}
          ></div>
        </div>

        <QuestionCard
          question={questions[current].question}
          options={questions[current].options}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}

export default App;