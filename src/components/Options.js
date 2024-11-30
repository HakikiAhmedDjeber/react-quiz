import { useQuiz } from "../Context";

function Options() {
  const { questions, index, dispatch, answer } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {questions[index].options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswer
              ? i === questions[index].correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          key={i}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
