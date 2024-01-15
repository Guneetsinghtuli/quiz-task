import React, { createContext, useContext, useState, useEffect } from "react";

const QuizDataContext = createContext();

export const useQuizData = () => {
  return useContext(QuizDataContext);
};

export const QuizDataProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [status, setStatus] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [email, setEmail] = useState("");

  const onEmailChange = (newEmail) => {
    setEmail(newEmail);
  };


  const generateQuizQuestions = async () => {
    try {
      let url = `https://opentdb.com/api.php?amount=15&type=multiple`;
      const res = await fetch(url);
      console.log(res.status)
      const data = await res.json();
      setStatus(data.response_code);
      setQuiz(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    generateQuizQuestions();
  }, [isVisible]);

  const hideForm = (isVisible) => {
    setIsVisible(isVisible);
  };

  const addSelectedOption = (questionIndex, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: option,
    }));
  };

  const contextValue = {
    isVisible,
    quiz,
    status,
    hideForm,
    selectedOptions,
    addSelectedOption,
    email,
    onEmailChange,
  };

  return (
    <QuizDataContext.Provider value={contextValue}>
      {children}
    </QuizDataContext.Provider>
  );
};
