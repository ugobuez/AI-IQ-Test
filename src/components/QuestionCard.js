import React from "react";

function QuestionCard({ question, options, onAnswer }) {
  return (
    <div>
      <h4 className="mb-4">{question}</h4>
      <div className="d-grid gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="btn btn-outline-primary btn-lg"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;