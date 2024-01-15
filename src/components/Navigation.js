import React, { useState, useEffect } from 'react';

function QuestionNavigation() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetch('YOUR_OPENDB_API_URL')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(questions[index]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h3>Questions</h3>
          <ul className="list-group">
            {questions.map((question, index) => (
              <li
                key={index}
                className={`list-group-item ${question.visited ? 'visited' : ''} ${
                  question.attempted ? 'attempted' : ''
                }`}
                onClick={() => handleQuestionClick(index)}
              >
                Question {index + 1}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8">
  {selectedQuestion && (
    <div>
      <h3>Question {questions.indexOf(selectedQuestion) + 1}</h3>
      <p>{selectedQuestion.text}</p>
      <ul>
        {selectedQuestion.options.map((option, optionIndex) => (
          <li key={optionIndex}>
            <label>
              <input
                type="radio"
                name={`question-${questions.indexOf(selectedQuestion)}`}
                value={option}
                // Add event handlers to handle option selection
                onChange={(e) => handleOptionSelect(e, selectedQuestion, option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <div>
        <label>
          Your Answer:
          <input
            type="text"
            value={selectedQuestion.userAnswer || ''}
            // Add an event handler to update the user's answer
            onChange={(e) => handleAnswerInput(e, selectedQuestion)}
          />
        </label>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
}

export default QuestionNavigation;
