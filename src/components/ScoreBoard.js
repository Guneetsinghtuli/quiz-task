import { Alert, Button, Col, Row , Table} from "react-bootstrap";
import { useQuizData } from "../QuizDataContext";

const ScoreBoard = ({ score}) => {
    const { quiz, selectedOptions } = useQuizData();

    
  let color;

  
    if (score < 5) {
      color = "danger";
    } else if (score < 10) {
      color = "warning";
    } else {
      color = "success";
    }


  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
        <Row>
            <Col className="text-center">
                <Alert variant={color}>
                    <Alert.Heading>Your Score</Alert.Heading>
                    <p>
                        {score} / {15}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button variant={"outline-" + color} onClick={handleReload}>
                            Start Again
                        </Button>
                    </div>
                </Alert>
            </Col>
        </Row>
        <div>
        <Table striped bordered hover variant="">
          <thead>
            <tr>
              <th>Question Number</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
            {quiz.map((question, index) => (
              <tr>
                <td>{index + 1}</td>
                <td dangerouslySetInnerHTML={{ __html: question.question }} />
                <td>{selectedOptions[index]}</td>
                <td>{question.correct_answer}</td>

                </tr>
            ))}
        </Table>
        </div>
    </>
);
};

export default ScoreBoard;