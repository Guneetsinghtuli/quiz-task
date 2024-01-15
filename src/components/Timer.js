import React, { useState, useEffect } from "react";
import {Spinner,Button} from "react-bootstrap";

const Timer = ({ onTimerExpired }) => {
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            } else {
                if (minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(timer);
                    onTimerExpired();
                }
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [minutes, seconds, onTimerExpired]);

    return (
          <Button className="ml-auto" variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="mx-4">Time:  {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")} </span>
      </Button>
    );
};

export default Timer;
