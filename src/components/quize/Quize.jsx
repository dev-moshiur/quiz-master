import "./quize.scss";
import React from "react";
import { useData } from "../../context";
export default function Quize({ questionIndex, setquestionIndex }) {
  const { data, dispatch } = useData();
  const coiceAnswer = (item) => {
    if (data.examQuestion[questionIndex].answer == item.option) {
      dispatch({
        type: "choiceAnswer",
        value: {
          answer: "",
          questionNo: questionIndex,
        },
      });
    } else {
      dispatch({
        type: "choiceAnswer",
        value: {
          answer: item.option,
          questionNo: questionIndex,
        },
      });
    }
  };

  return (
    <div className="quize">
      <div className="question">
        {data.examQuestion[questionIndex].question}
      </div>
      <ol>
        {data.examQuestion[questionIndex].options.map((item) => (
          <li
            className={
              data.examQuestion[questionIndex].answer == item.option
                ? "selected"
                : ""
            }
            onClick={() => coiceAnswer(item)}
          >
            {item.option}
          </li>
        ))}
      </ol>
    </div>
  );
}
