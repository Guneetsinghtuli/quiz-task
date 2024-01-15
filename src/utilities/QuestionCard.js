import React, { useEffect, useReducer, useState } from "react";
import { Card, Col, Container, Row, Badge,Button } from "react-bootstrap";

import ButtonAnswers from "../components/partials/ButtonAnswers";
import { decodeHTML } from "../helpers/decodeHTML";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import { useQuizResults } from "./Hooks";
import questionCountReducer from "./questionCountReducer"; // Import the reducer
import { useQuizData } from "../QuizDataContext";



const QuestionCard = ({ quiz }) => {
  const initialState = {
    currentQuestionIndex: 0,
    visitedQuestions: [], // Track visited questions
    attemptedQuestions: [], // Track attempted questions
  };

  const [state, dispatch] = useReducer(questionCountReducer, initialState);
  const currentQuestion = quiz[state.currentQuestionIndex];
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  const { addSelectedOption } = useQuizData();

  let arr = [currentQuestion.correct_answer].concat(
    currentQuestion.incorrect_answers
  );
  
  arr.sort(function () {
    return Math.random() - 0.5;
  });

  useEffect(() => {
    if (state.currentQuestionIndex > quiz.length - 1) {
      setQuizEnded(true);
    }
  }, [state.currentQuestionIndex, quiz]);

  const handleNextQuestion = (answer) => {
    setTimeout(() => {
      if (answer === currentQuestion.correct_answer) {
        setScore(score + 1);
      }
      addSelectedOption(state.currentQuestionIndex, answer);
      if (state.currentQuestionIndex < quiz.length - 1) {
        dispatch({ type: "NEXT_QUESTION" });
      } else {
        setQuizEnded(true);
      }
    }, 1000);
  };

  const totalQuestions = quiz.length;

  const quizResults = {
    score: score,
    questionNumber: quiz.length,
    date: new Date(),
  };

  useQuizResults(quizResults, quizEnded);

  const handleTimerExpired = () => {
    setQuizEnded(true);

  };

  const endQuiz = () => {
    setQuizEnded(true);

  }

  // Function to navigate to a specific question
  const navigateToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < quiz.length) {
      dispatch({ type: "NAVIGATE_QUESTION", payload: questionIndex });
    }
  };


const renderQuestionButtons = () => {
    return quiz.map((question, index) => {
      // const isVisited = state.visitedQuestions.includes(index);
      // const isAttempted = state.attemptedQuestions.includes(index);
  
      return (
        <Badge 
        className="mx-1 my-1"
        bg="secondary"
        key={index}
        onClick={() => navigateToQuestion(index)}
        >
          Question {index + 1}
          </Badge>
      );
    });
  };
    

  return (
    <Container>
      <Container className="d-flex">
        {!quizEnded && <Timer onTimerExpired={handleTimerExpired} />}
      </Container>
      {quizEnded ? (
        <ScoreBoard score={score} totalQuestions={totalQuestions} />
      ) : (

       <div>
      <div className="my-4">
      <Container className="mx-6 d-flex justify-content-evenly align-items-center flex-wrap">
      {renderQuestionButtons()}

        </Container>
      
    </div>
    <br/>
        <Card>
          
          <Card.Body className="text-center">
            <Row>
              <Col>
                <p
                  dangerouslySetInnerHTML={{
                    __html: decodeHTML(currentQuestion.question),
                  }}
                ></p>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <ButtonAnswers
                  answers={arr}
                  onClick={handleNextQuestion}
                  correct={currentQuestion.correct_answer}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className="text-end">
                {state.currentQuestionIndex + 1} / {totalQuestions}
              </Col>
            </Row>
          </Card.Footer>
        </Card>
       </div>
      )}
      { !quizEnded && 
      <Container>
        <Button
        variant="danger"
        className="mt-4"
        onClick={() => endQuiz()}
        >
          End Quiz
        </Button>
      </Container>
}

      
    </Container>
  );
};

export default QuestionCard;
