import { useState } from 'react';
import { Home } from './Home';
import { Quiz } from './Quiz';

export default function Landing() {
    const [start, setStart] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState<string>('5');
    const [category, setCategory] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');

    function startQuiz() {
        setStart((prevState) => !prevState);
    }

    function fetchString(): string {
        let baseStr: string = `https://opentdb.com/api.php?amount=${numOfQuestions}`;
        if (category) baseStr += `&category=${category}`;
        if (difficulty) baseStr += `&difficulty=${difficulty}`;
        console.log(baseStr);
        return baseStr;
    }

    return (
        <section className="page">
            {!start ? (
                <Home
                    onClick={startQuiz}
                    questionNum={numOfQuestions}
                    setNumOfQuestions={setNumOfQuestions}
                    category={category}
                    setCategory={setCategory}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                />
            ) : (
                <Quiz fetchString={fetchString} />
            )}
        </section>
    );
}
