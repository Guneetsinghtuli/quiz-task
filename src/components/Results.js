import { Card, Container, ListGroup} from "react-bootstrap";
import { formatDate } from "../helpers/formatDate";

const Results = () => {
    const storedData = localStorage.getItem("quizResults");
    const data = storedData ? JSON.parse(storedData) : null;
    const sortedData = data
        ? [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        : null;

    return (
        <Container className="mt-5">
            <Card style={{ maxHeight: "250px", overflowY: "auto" }}>
                <Card.Header>Quiz Results</Card.Header>
                <ListGroup variant="flush">
                    {sortedData ? (
                        sortedData.map((result, index) => (
                            <ListGroup.Item key={index}>
                                <strong>Category:</strong> {result.category}
                                <br />
                                <strong>Difficulty:</strong> {result.difficulty}
                                <br />
                                <strong>Score:</strong> {result.score} / {result.questionNumber}
                                <br />
                                <strong>Date:</strong> {formatDate(result.date)}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No results found.</ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Container>
    );
};

export default Results;
