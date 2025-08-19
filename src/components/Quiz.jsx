import { useState, useEffect } from 'react';
import { decode } from 'he';
export function Quiz() {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        async function apiCall() {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=10'
            );
            const data = await response.json();
            const filteredData = await data.results.map(
                ({
                    type,
                    question,
                    incorrect_answers,
                    correct_answer,
                    category,
                }) => ({
                    type,
                    question,
                    incorrect_answers,
                    correct_answer,
                    category,
                })
            );
            setQuizData(filteredData);
        }
        apiCall();
    }, []);

    return (
        <>
            {quizData.map((question) => (
                <div id={quizData.length + 1}>
                    <h1>{decode(question.question)}</h1>
                </div>
            ))}
        </>
    );
}
