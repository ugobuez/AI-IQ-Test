import React, { useState } from "react";
import questions from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  function handleAnswer(option) {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    setCurrent(current + 1);
  }

  if (current >= questions.length) {
    const iq = 80 + score * 10;

    return (
      <div className="container text-center mt-5">
        <div className="card shadow p-5">
          <h1 className="mb-4">🎉 Your IQ Score</h1>
          <h2 className="display-4">{iq}</h2>
          <p className="mt-3">You answered {score} out of {questions.length} correctly!</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => { setCurrent(0); setScore(0); }}
          >
            Retry Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">Question {current + 1} of {questions.length}</h2>
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