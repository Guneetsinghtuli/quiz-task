import {Col, Row, Spinner} from "react-bootstrap";

const Loader = () => {
    return (
       <>
          <Row>
              <Col className='text-center'>
                  <Spinner animation="grow" variant="dark" />
                  <Spinner animation="grow" variant="dark" />
                  <Spinner animation="grow" variant="dark" />
              </Col>
          </Row>
       </>
    );
};

export default Loader;