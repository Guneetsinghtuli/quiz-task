import React from "react";
import TitleBar from "./components/partials/TitleBar";
import Selection from "./components/Selection";
import FormGenerate from "./components/partials/FormGenerate";
import QuestionCard from "./utilities/QuestionCard";
import Loader from "./components/Loader";
import ErrorAlert from "./components/ErrorAlert";
import { useQuizData, QuizDataProvider } from "./QuizDataContext";

const App = () => {

  const {
    selectedDifficulty,
    isDisabled,
    isVisible,
    quiz,
    status,
    categoryName,
    hideForm,
    onEmailChange,
  } = useQuizData();

  return (
    <React.Fragment >
      <TitleBar>
        <h1 className='text-white text-center'>Let's Start</h1>
      </TitleBar>
      {isVisible && (
        <>
          <Selection>
            <FormGenerate
              onEmailChange={onEmailChange}
              buttonState={isDisabled}
              onHideForm={hideForm}
            />
          </Selection>
          {/* <Results /> */}
        </>
      )
      }
      {
      status >= 400
      ? (
        <ErrorAlert />
      ) : (
        !isVisible && (
          quiz.length > 0 ? (
            <QuestionCard quiz={quiz} selectedDifficulty={selectedDifficulty} selectedCategory={categoryName} />
          ) : (
            <Loader />
          )
        )
      )}
    </React.Fragment>
  );
};

const AppWithContext = () => {
  return (
    <QuizDataProvider>
      <App />
    </QuizDataProvider>
  );
};

export default AppWithContext;
