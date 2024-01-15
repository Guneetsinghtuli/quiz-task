import {Alert, Col, Container, Row} from "react-bootstrap";

const ErrorAlert = () => {
    return (
        <>
           <Container className='mt-3'>
               <Row>
                   <Col className='text-center'>
                       <Alert  variant='warning'>
                           <Alert.Heading>There Is Something Wrong</Alert.Heading>
                           <p>Currently No Questions Available</p>
                       </Alert>
                   </Col>
               </Row>
           </Container>
        </>
    );
}

export default ErrorAlert;