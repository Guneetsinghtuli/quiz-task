import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { decodeHTML } from "../../helpers/decodeHTML";


const ButtonAnswers = ({ answers, onClick, correct }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);


    useEffect(() => {
        setSelectedAnswer(null);
        setButtonDisabled(false);
    }, [answers]);

    const handleButtonClick = (index,answer) => {
        setSelectedAnswer(answer);
        setButtonDisabled(true);
        onClick(answer);
    };

    return (
        answers.map((answer,index) => {
            let buttonVariant = "outline-dark";
            if (answer === selectedAnswer) {
                buttonVariant = answer === correct ? "success" : "danger";
            } else if (buttonDisabled && selectedAnswer !== correct && answer === correct) {
                buttonVariant = "success";
            }

            return (
                <Button
                    key={answer}
                    className="m-3"
                    variant={`${buttonVariant}`}
                    onClick={() => handleButtonClick(index,answer)}
                    disabled={buttonDisabled}
                    dangerouslySetInnerHTML={{
                        __html: decodeHTML(answer),
                    }}
                >

                </Button>
            );
        })
    );
};

export default ButtonAnswers;
