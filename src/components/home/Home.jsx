import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { useData } from "../../context";
export default function Home() {
  const { data, dispatch } = useData();
  return (
    <div className="home">
      <div className="heading">Lets jump into a quiz tests!</div>
      <div className="catagooryContainer">
        <Link
          onClick={() => dispatch({ type: "quizTestCatagory", value: "html" })}
          to={"participent"}
        >
          HTML
        </Link>
        <Link
          onClick={() => dispatch({ type: "quizTestCatagory", value: "css" })}
          to={"participent"}
        >
          CSS
        </Link>
        <Link
          onClick={() =>
            dispatch({ type: "quizTestCatagory", value: "javascript" })
          }
          to={"participent"}
        >
          Javascript
        </Link>
        <Link
          onClick={() => dispatch({ type: "quizTestCatagory", value: "react" })}
          to={"participent"}
        >
          React
        </Link>
        <Link
          onClick={() =>
            dispatch({ type: "quizTestCatagory", value: "express" })
          }
          to={"participent"}
        >
          Express
        </Link>
      </div>
    </div>
  );
}
