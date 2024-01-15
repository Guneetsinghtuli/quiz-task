import {useEffect } from "react";

export const useQuizResults = (quizResults, quizEnded) => {
    useEffect(() => {
        if (quizEnded) {
            const storedResults = localStorage.getItem("quizResults");
            const previousResults = storedResults ? JSON.parse(storedResults) : [];
            const updatedResults = [...previousResults, quizResults];
            localStorage.setItem("quizResults", JSON.stringify(updatedResults));
        }
    }, [quizEnded, quizResults]);
};

