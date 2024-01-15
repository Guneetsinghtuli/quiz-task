import {Col, Container, Row} from "react-bootstrap";

const TitleBar = ({props, children}) => {
    return  <Container className='my-5'>
        <Row className='my-5'>
            <Col>
                {children}
            </Col>
        </Row>
    </Container>
}

export default TitleBar;