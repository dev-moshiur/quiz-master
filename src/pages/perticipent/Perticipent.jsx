import "./perticipent.scss";
import React from "react";
import { useState, useEffect } from "react";
import Quize from "../../components/quiz/Quiz";
import { useData } from "../../context";
import loadinImg from "../../images/Loading_icon.gif";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Timer,
} from "@material-ui/icons";
import ExecutedQuiz from "../executedQuiz/ExecutedQuiz";
export default function Perticipent() {
  const { data, dispatch } = useData();
  const [questionIndex, setquestionIndex] = useState(0);
  const [time, setTime] = useState(150);
  const [completeExam, setcompleteExam] = useState(false);
  const [loading, setLoading] = useState(false)

  const [writeAnswer, setwriteAnswer] = useState(0);
  const server = `https://quiz-app-api-nine.vercel.app`;
  const changeIndex = (direction) => {
    if (direction == "previous") {
      if (questionIndex <= 0) {
        setquestionIndex(data.examQuestion.length - 1);
      } else {
        setquestionIndex((prequestionIndex) => prequestionIndex - 1);
      }
    } else if (direction == "next") {
      if (questionIndex >= data.examQuestion.length - 1) {
        setquestionIndex(0);
      } else {
        setquestionIndex((prequestionIndex) => prequestionIndex + 1);
      }
    }
  };

  const execuate = () => {
    data.examQuestion.forEach((item) => {
      if (item.correctAnswer && item.answer) {
        if (item.correctAnswer.option == item.answer) {
          setwriteAnswer((prewriteAnswer) => prewriteAnswer + 1);
        }
      }
    });
    setcompleteExam(true);
  };
  const procesData = (data) => {
    const processedData = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);
    dispatch({
      type: "examQuestion",
      value: processedData,
    });
  };
  useEffect(() => {
    setLoading(true)
    fetch(`${server}/quize/?catagory=${data.quizTestCatagory}`)
      .then((res) => res.json())
      .then((data) => {
        procesData(data);
        setLoading(false)
      });
  }, []);

  return (
    <>
    {loading && (
        <div className="loading">
          <img src={loadinImg} alt="" />
        </div>
      )}
      {!completeExam && (
        <div className="pertcipate">
          <div className="index">
            <div className="number">
              {`${questionIndex + 1}/${
                data.examQuestion.length > 0 ? data.examQuestion.length : ""
              }`}
            </div>
            <div className="point">
              <Timer />{" "}
              <span>
                {Math.floor(time / 60)} : {time % 60}
              </span>
            </div>
          </div>
          <div className="quizeContainer">
            {data.examQuestion[questionIndex] && (
              <Quize
                questionIndex={questionIndex}
                setquestionIndex={setquestionIndex}
              />
            )}
          </div>
          <div className="buttons">
            <button onClick={() => changeIndex("previous")}>
              <KeyboardArrowLeft />
            </button>
            <button onClick={() => changeIndex("next")}>
              <KeyboardArrowRight />
            </button>
            <div onClick={() => execuate()}>Finish</div>
          </div>
        </div>
      )}
      {completeExam && (
        <div className="excequetion">
          <div className="head">
            <div className="catagoty">
              <span>{data.examQuestion[0].catagory}</span>
            </div>
            <div className="mark">
              <span>
                {`${Math.round(
                  (writeAnswer / data.examQuestion.length) * 100
                )}/100`}
              </span>
            </div>
          </div>
          <div className="quizContainer">
            {data.examQuestion.map((item, index) => (
              <ExecutedQuiz item={item} number={index + 1} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
