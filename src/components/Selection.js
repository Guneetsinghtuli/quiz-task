import {Card, Container} from "react-bootstrap";

const Selection = ({children}) => {
    return (
        <Container>
            <Card
                border="dark"
            >
                <Card.Header>Enter your email to start the quiz</Card.Header>
                <Card.Body>{children}</Card.Body>
            </Card>
        </Container>
    );
};

export default Selection;