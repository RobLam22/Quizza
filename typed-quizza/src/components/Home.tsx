import type { JSX } from 'react';
import { categories } from '../utils/categories';
import type { Category } from '../utils/categories';

type HomeProps = {
    onClick: () => void;
    questionNum: string;
    setNumOfQuestions: () => void;
    category: string;
    setCategory: () => void;
    difficulty: string;
    setDifficulty: () => void;
};

export function Home({
    onClick,
    questionNum,
    setNumOfQuestions,
    category,
    setCategory,
    difficulty,
    setDifficulty,
}: HomeProps): JSX.Element {
    const options: JSX.Element[] = categories.map((category: Category) => (
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
    ));

    function log(): void {
        console.log(questionNum);
        console.log(category);
        console.log(difficulty);
    }

    return (
        <>
            <h1>Quizza</h1>
            <p>What Do You Know? Do You Know Things? Let's Find Out!</p>
            <h3>Choose your Quiz settings here:</h3>
            <div>
                <label htmlFor="number-of-questions">
                    <span className="text-sm font-medium text-gray-700">
                        Number of Questions
                    </span>
                    <select
                        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
                        onChange={(e) => setNumOfQuestions(e.target.value)}
                        value={questionNum}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </label>
                <label htmlFor="category">
                    <span className="text-sm font-medium text-gray-700">
                        Category
                    </span>
                    <select
                        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {options}
                    </select>
                </label>
                <label htmlFor="difficulty">
                    <span className="text-sm font-medium text-gray-700">
                        Difficulty
                    </span>
                    <select
                        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
            </div>
            <button
                onClick={() => {
                    log();
                    onClick();
                }}
                className="start"
            >
                Find out
            </button>
        </>
    );
}
