import React from "react";
import "./executedQuiz.scss";
export default function ExecutedQuiz({ item, number }) {
  const putClass = (item, elm) => {
    if (elm.option && item.correctAnswer && item.answer) {
      if (
        elm.option == item.correctAnswer.option &&
        elm.option == item.answer
      ) {
        return "green";
      } else if (
        elm.option == item.answer &&
        elm.option != item.correctAnswer.option
      ) {
        return "orange";
      } else if (
        elm.option == item.correctAnswer.option &&
        elm.option != item.answer
      ) {
        return "light";
      }
    } else if (elm.option && !item.correctAnswer && !item.answer) {
      if (elm.stutus == "correct") {
        return "light";
      }
    }
  };
  return (
    <div className="ExecutedQuiz">
      <div className="question">
        {number}.{item.question}
      </div>
      <ol>
        {item.options.map((elm) => (
          <li className={putClass(item, elm)}>{elm.option}</li>
        ))}
      </ol>
    </div>
  );
}
