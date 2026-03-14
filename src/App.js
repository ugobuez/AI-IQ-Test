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
        <div className="card shadow-lg p-5 bg-light">
          <h1 className="mb-4 text-success">🎉 Your IQ Score</h1>
          <h2 className="display-3 text-primary">{iq}</h2>

          <p className="mt-3 fs-4">
            You answered {score} out of {questions.length} correctly!
          </p>

          <button
            className="btn btn-warning btn-lg mt-4"
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
      <div className="card shadow-lg p-4 bg-white">
        <h2 className="mb-4 text-primary">
          Question {current + 1} of {questions.length}
        </h2>

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