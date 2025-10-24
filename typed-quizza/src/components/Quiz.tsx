import { useState, useEffect } from 'react';
import { decode } from 'he';
import { shuffleAnswers } from '../utils/shuffleAnswers';
import type { JSX } from 'react';

type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    mixed_answers: string[];
    question: string;
    type: string;
};

type ApiResponse = {
    results: Omit<Question, 'mixed_answers'>[];
};

type QuizProps = {
    fetchString: () => string;
};

export function Quiz({ fetchString }: QuizProps) {
    const [quizData, setQuizData] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [gameEnd, setgameEnd] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>(false);
    fetchString();
    console.log(quizData);

    useEffect(() => {
        // cleanup function
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach((btn) => {
            btn.className = '';
        });
        setgameEnd(false);

        // api call
        async function apiCall(): Promise<void | null> {
            try {
                const response = await fetch(fetchString());
                const data: ApiResponse = await response.json();
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
    }, [restart]);

    const questions: JSX.Element[] = quizData.map(
        (question: Question, index: number) => (
            <>
                <div key={index}>
                    <h2>{decode(question.question)}</h2>
                    <div className="answers">
                        {question.mixed_answers.map(
                            (answer: string, index: number) => (
                                <button
                                    key={index}
                                    id={index.toString()}
                                    onClick={selectAnswer}
                                    value={answer}
                                >
                                    {decode(answer)}
                                </button>
                            )
                        )}
                    </div>
                </div>
                <hr />
            </>
        )
    );

    function selectAnswer(e: React.MouseEvent<HTMLButtonElement>): void {
        const target = e.currentTarget;
        const container = target.parentElement;

        if (!container) return;

        for (const child of Array.from(container.children)) {
            if (child instanceof HTMLElement) {
                child.classList.toggle('selected', child.id === target.id);
            }
        }
    }

    function checkAnswers(): void {
        const selectedBtns: HTMLButtonElement[] = Array.from(
            document.querySelectorAll('.selected')
        );
        const guessedAnswers: string[] = Array.from(selectedBtns).map(
            (answer) => answer.value
        );
        selectedBtns.forEach((btn, i) => {
            btn.classList.remove('selected');
            btn.classList.add(
                guessedAnswers[i] === answers[i] ? 'correct' : 'incorrect'
            );
        });

        const answerBlocks: HTMLButtonElement[] = Array.from(
            document.querySelectorAll('.answers')
        );
        answerBlocks.forEach((block: HTMLButtonElement, i: number) => {
            const buttons = block.querySelectorAll('button');
            buttons.forEach((btn) => {
                if (btn.classList.contains('correct')) return;
                if (btn.value === answers[i]) btn.classList.add('right');
            });
        });

        setgameEnd(true);
    }

    function restartGame(): void {
        setRestart((prevRestart: boolean) => !prevRestart);
    }

    return (
        <>
            {questions}
            <p>
                {gameEnd
                    ? `You got ${document.querySelectorAll('.correct').length}/5 right`
                    : `What Do You Know?`}
            </p>
            <button
                className="reset"
                onClick={gameEnd ? restartGame : checkAnswers}
            >
                {gameEnd ? 'Play Again?' : 'Check answers'}
            </button>
        </>
    );
}
