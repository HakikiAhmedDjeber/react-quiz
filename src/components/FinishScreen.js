function FinishScreen({ points, maxPointsValue, highscore }) {
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
    </>
  );
}

export default FinishScreen;
