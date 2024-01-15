import React from "react";
import { useQuizData } from "../QuizDataContext";

const Question = ({ question, questionIndex }) => {
  const { addSelectedOption } = useQuizData();

  const handleOptionSelect = (selectedOption) => {
    addSelectedOption(questionIndex, selectedOption);
  };

  return (
    <div>
      <p>{question.question}</p>
      {question.options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question_${questionIndex}`}
            value={option}
            onChange={() => handleOptionSelect(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;
