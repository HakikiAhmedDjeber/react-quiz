import { useEffect } from "react";

function TimeFormater(seconds) {
  const M = Math.trunc(seconds / 60);
  const S = seconds - M * 60;
  return `${M < 10 ? "0" + M : +M}:${S < 10 ? "0" + S : S}`;
}

function Timer({ dispatch, secondsRemaining }) {
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return <p className="timer">{TimeFormater(secondsRemaining)}</p>;
}

export default Timer;
