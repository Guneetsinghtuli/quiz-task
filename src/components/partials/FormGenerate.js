import {Col, Form, Button} from "react-bootstrap";
import {useState} from "react";

const FormGenerate = ({onEmailChange,onHideForm}) => {

    const handleEmailChange = (event) => {
        const email = event.target.value;
        onEmailChange(email);

    }

    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    console.log("form submitted")

    setValidated(true);
    onHideForm(false);
  };

    return  <Form 
        validated={validated}
        onSubmit={handleSubmit}
        className="m-4"

    >
        <Form.Group as={Col} controlId="formGridState">
            <Form.Control
                onChange={handleEmailChange}
                type="email"
                placeholder="Enter email"
                required
                
            />
            <Form.Control.Feedback type="invalid">
                Please provide a valid email.
            </Form.Control.Feedback>

            <div className="d-grid gap-2 mx-4 my-3">
            <Button  variant="dark" type="submit">
                Start
            </Button>

            </div>


        </Form.Group>
    </Form>
};


export default FormGenerate;