import { useQuiz } from "../Context";

function Progress() {
  const { questions, index, answer, points } = useQuiz();
  const maxPointsValue = questions.reduce((prev, cur) => prev + cur.points, 0);

  const numQuestions = questions.length;
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPointsValue} Points
      </p>
    </header>
  );
}

export default Progress;
