function QuestionCard({ question, options = [], onAnswer }) {

  const colors = [
    "btn-primary",
    "btn-success",
    "btn-warning",
    "btn-danger"
  ];

  return (
    <div>
      <h4 className="mb-4">{question || "No question available"}</h4>

      <div className="d-grid gap-3">

        {options.length > 0 ? (
          options.map((option, index) => (
            <button
              key={index}
              className={`btn ${colors[index % colors.length]} btn-lg`}
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))
        ) : (
          <p>Loading options...</p>
        )}

      </div>
    </div>
  );
}

export default QuestionCard;