import { useState, useEffect } from 'react';
import { decode } from 'he';
import { shuffleAnswers } from '../utils/shuffleAnswers';
import type { JSX } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import supabase from '@/utils/supabase-client';

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

export function Quiz(): JSX.Element {
    const { session } = useAuth();

    const [quizData, setQuizData] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [gameEnd, setgameEnd] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>(false);

    // useLocation to receive url from SetupQuiz.tsx
    const location = useLocation();
    const { numOfQuestions, category, difficulty } = location.state || {};

    function generateString(num: string, cat: string, diff: string): string {
        let baseStr: string = `https://opentdb.com/api.php?amount=${num}`;
        if (category != '0') baseStr += `&category=${cat}`;
        if (difficulty != 'any') baseStr += `&difficulty=${diff}`;
        return baseStr;
    }

    // retrieveQuestions
    useEffect(() => {
        // cleanup function
        setAnswers([]);
        setgameEnd(false);

        // api call
        async function apiCall(): Promise<void | null> {
            try {
                const response = await fetch(
                    generateString(numOfQuestions, category, difficulty)
                );
                const data: ApiResponse = await response.json();
                const filteredData = data.results.map((result) => ({
                    ...result,
                    mixed_answers: shuffleAnswers([
                        result.correct_answer,
                        ...result.incorrect_answers,
                    ]),
                }));
                setQuizData(filteredData);
            } catch (error) {
                console.error('ERROR', error);
                return null;
            }
        }
        apiCall();
    }, [restart]);

    // Button styles
    const styles = {
        default:
            'inline-block rounded-lg border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden',
        locked: 'inline-block rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-200',
        selected:
            'inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm text-gray-900 font-medium text-white',
        correctGuess:
            'inline-block rounded-lg border-indigo-600 bg-emerald-600 px-4 py-2 text-sm text-gray-900 font-medium text-white',
        incorrectGuess:
            'inline-block rounded-lg border-indigo-600 bg-red-600 px-4 py-2 text-sm text-gray-900 font-medium text-white',
        correctAnswer:
            'inline-block rounded-lg border border-emerald-400 px-4 py-2 text-sm text-gray-900 font-medium text-emerald-400',
    };

    // Logic for button styling
    function getAnswersBtnClass(questionNum: number, answer: string) {
        const correct = quizData[questionNum].correct_answer;
        const selected = answers[questionNum];

        if (!gameEnd) {
            return selected === answer ? styles.selected : styles.default;
        }
        if (answer === selected && answer === correct) {
            // Selected & Correct
            return styles.correctGuess;
        } else if (answer === selected && answer !== correct) {
            // Selected but Wrong
            return styles.incorrectGuess;
        } else if (answer === correct && answer !== selected) {
            // Correct but Not Selected
            return styles.correctAnswer;
        } else {
            // Unselected answers
            return styles.locked;
        }
    }

    // Logic for submit button styling
    function getSubmitBtnClass() {
        const allAnswered =
            answers.length === quizData.length &&
            answers.every((a) => a !== undefined);
        return allAnswered;
    }

    // Logic to build page
    const questions = quizData.map(
        (question: Question, questionIndex: number) => (
            <div
                key={questionIndex}
                className="flex flex-col justify-center items-center"
            >
                <h2 className="px-12 text-lg font-bold md:text-2xl md:pt-6 md:pb-2 md:px-32 text-center">
                    {decode(question.question)}
                </h2>

                <div className="flex gap-4 py-2 px-16 justify-center">
                    {question.mixed_answers.map(
                        (answer: string, answerIndex: number) => {
                            return (
                                <button
                                    key={answerIndex}
                                    value={answer}
                                    className={getAnswersBtnClass(
                                        questionIndex,
                                        answer
                                    )}
                                    onClick={() =>
                                        selectAnswer(questionIndex, answer)
                                    }
                                    disabled={gameEnd}
                                >
                                    {decode(answer)}
                                </button>
                            );
                        }
                    )}
                </div>

                <hr />
            </div>
        )
    );

    // Logic to guess an answer
    function selectAnswer(questionIndex: number, answer: string): void {
        setAnswers((prevAnswers: string[]) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[questionIndex] = answer;
            return updatedAnswers;
        });
    }

    // Logic to submit answers
    function checkAnswers(): void {
        setgameEnd(true);
        logGame();
    }

    function numOfCorrectAnswers(): number {
        const correctCount = answers.filter(
            (answer, i) => answer === quizData[i].correct_answer
        ).length;
        return correctCount;
    }

    // Restart the game
    function restartGame(): void {
        setRestart((prevRestart: boolean) => !prevRestart);
    }

    async function logGame(): Promise<void> {
        const gameData = {
            first_name: session.user.user_metadata.first_name,
            category,
            numOfQuestions,
            difficulty,
            score: numOfCorrectAnswers(),
        };
        try {
            const { error } = await supabase
                .from('leaderboard')
                .insert(gameData);
            if (error) {
                console.error('Error logging game: ', error.message);
            }
            console.log('Data inserted successfully');
        } catch (error: any) {
            console.log('Error inserting data', error.message);
        }
    }

    return (
        <>
            <div className="sm:block">{questions}</div>
            <div className="flex flex-col justify-center items-center">
                <p className="my-8">
                    {gameEnd
                        ? `You got ${numOfCorrectAnswers()} / ${answers.length} right`
                        : `What Do You Know?`}
                </p>
                <button
                    onClick={gameEnd ? restartGame : checkAnswers}
                    className={
                        getSubmitBtnClass() ? styles.default : styles.locked
                    }
                    disabled={!getSubmitBtnClass()}
                >
                    {gameEnd ? 'Play Again?' : 'Check answers'}
                </button>
            </div>
        </>
    );
}
