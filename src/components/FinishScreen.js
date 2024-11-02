function FinishScreen({ points, maxPointsValue, highscore, dispatch }) {
  const percentage = (points / maxPointsValue) * 100;

  let imoji;
  if (percentage === 100) imoji = "🥇";
  if (percentage >= 80 && percentage < 100) imoji = "🎊";
  if (percentage < 70) imoji = "😊";
  if (percentage < 50) imoji = "😑";
  if (percentage === 0) imoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {imoji} You scored <strong>{points}</strong> out of {maxPointsValue} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore : {highscore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
