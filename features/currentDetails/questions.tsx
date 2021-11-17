import { useEffect } from "react";
import {
  getQuestionsAsync,
  useCurrentDetailsContext,
} from "./currentDetailsContext";

const Questions = () => {
  const { questions, status, dispatch } = useCurrentDetailsContext();

  useEffect(() => {
    getQuestionsAsync(dispatch);
  }, []);

  if (status === "loading") {
    return <h1>Loading..</h1>;
  }
  return (
    <ul>
      {questions.map((q, index) => (
        <li key={index}>
          <h2>{q.question}</h2>
          <input type={q.type} />
        </li>
      ))}
    </ul>
  );
};

export default Questions;
