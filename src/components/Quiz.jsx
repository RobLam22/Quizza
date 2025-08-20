import { useState, useEffect } from 'react';
import { decode } from 'he';
import { shuffleAnswers } from '../utils/shuffleAnswers';

export function Quiz() {
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function apiCall() {
            try {
                const response = await fetch(
                    'https://opentdb.com/api.php?amount=5'
                );
                const data = await response.json();
                const filteredData = data.results.map((result) => ({
                    ...result,
                    mixed_answers: shuffleAnswers([
                        result.correct_answer,
                        ...result.incorrect_answers,
                    ]),
                }));
                const answersArr = data.results.map(
                    (result) => result.correct_answer
                );
                setQuizData(filteredData);
                setAnswers(answersArr);
            } catch (error) {
                console.error('ERROR', error);
                return null;
            }
        }
        apiCall();
    }, []);

    console.log(answers);

    const questions = quizData.map((question, index) => (
        <div key={index}>
            <h2>{decode(question.question)}</h2>
            <div className="answers">
                {question.mixed_answers.map((answer, index) => (
                    <button
                        key={index}
                        id={index}
                        onClick={selectAnswer}
                        value={answer}
                    >
                        {decode(answer)}
                    </button>
                ))}
            </div>
        </div>
    ));

    function selectAnswer(e) {
        const container = e.target.parentElement;
        const selectedAnswer = e.target.id;
        for (let child of container.children) {
            if (child.id != e.target.id) {
                child.classList.remove('selected');
            } else {
                child.classList.add('selected');
            }
        }
        e.target.classList.add('selected');
    }

    function checkAnswers() {
        const allAnswers = document.querySelectorAll('.selected');
        console.log(Array.from(allAnswers).map((answer) => answer.value));
    }

    return (
        <>
            {questions}
            <button onClick={checkAnswers}>Check answers</button>
        </>
    );
}
