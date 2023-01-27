import { useContext } from "react";
import { useReducer } from "react";
import React from "react";
const dataContext = React.createContext();

export const useData = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  let intialState = {
    optionInputField: true,
    examQuestion: [],
    loading: false,
    options: [],
    admin:false,
    quizTestCatagory: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "addOption":
        return {
          ...state,
          options: [...state.options, action.value],
        };
      case "clearOption":
        return {
          ...state,
          options: [],
        };
      case "examQuestion":
        return {
          ...state,
          examQuestion: action.value,
        };
      case "setAdmin":
        return {
          ...state,
          admin: action.value,
        };
      case "changeLoading":
        return {
          ...state,
          loading: !state.loading,
        };
      case "quizTestCatagory":
        return {
          ...state,
          quizTestCatagory: action.value,
        };
      case "choiceAnswer":
        let question = state.examQuestion[action.value.questionNo];
        question.answer = action.value.answer;
        question.correctAnswer = question.options.filter(
          (item) => item.stutus == "correct"
        )[0];
        state.examQuestion[action.value.questionNo] = question;
        return {
          ...state,
        };

      default:
        return {
          ...state,
        };
    }
  };
  const [data, dispatch] = useReducer(reducer, intialState);
  const allData = {
    data,
    dispatch,
  };
  return (
    <dataContext.Provider value={allData}>{children}</dataContext.Provider>
  );
}
