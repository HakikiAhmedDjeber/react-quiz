import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";

const initialstate = {
  // "Loading" , "error" , "ready" , "active" , "finished"
  status: "loading",
  questions: [],
  answer: null,
  index: 0,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, status: "ready", questions: action.payload };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const numQuestions = questions.length;
  const maxPointsValue = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:3005/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numQuestions}
              points={points}
              maxPointsValue={maxPointsValue}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextQuestion dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
