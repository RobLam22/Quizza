import { useState } from 'react';
import { categories } from '../utils/categories';
import type { Category } from '../utils/categories';
import type { JSX } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function SetupQuiz() {
    const [numOfQuestions, setNumOfQuestions] = useState<string>('5');
    const [category, setCategory] = useState<string>('0');
    const [difficulty, setDifficulty] = useState<string>('any');

    const categoryOptions: JSX.Element[] = categories.map(
        (category: Category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
            </SelectItem>
        )
    );

    return (
        <>
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle>Setup Quiz</CardTitle>
                    <CardDescription className>
                        What Do You Know? Do You Know Things? Let's Find Out!
                    </CardDescription>
                    <CardAction>
                        {' '}
                        <Link
                            to="/quiz"
                            state={{ numOfQuestions, category, difficulty }}
                            className="inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm text-gray-900 font-medium text-white"
                        >
                            Lets find out!{' '}
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <CardTitle className="pb-4">
                        Choose your Quiz settings here:
                    </CardTitle>
                    <div className="flex flex-col gap-2 sm:flex-row flex-wrap">
                        <label htmlFor="number-of-questions">
                            <span className="text-sm font-medium text-gray-700">
                                Number of Questions
                            </span>
                            <Select
                                value={numOfQuestions}
                                onValueChange={(value) =>
                                    setNumOfQuestions(value)
                                }
                            >
                                <SelectTrigger className="w-[320px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                        <label htmlFor="category">
                            <span className="text-sm font-medium text-gray-700">
                                Category
                            </span>
                            <Select
                                value={category}
                                onValueChange={(value) => setCategory(value)}
                            >
                                <SelectTrigger className="w-[320px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>{categoryOptions}</SelectContent>
                            </Select>
                        </label>
                        <label htmlFor="difficulty">
                            <span className="text-sm font-medium text-gray-700">
                                Difficulty
                            </span>
                            <Select
                                value={difficulty}
                                onValueChange={(value) => setDifficulty(value)}
                            >
                                <SelectTrigger className="w-[320px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">
                                        Any Difficulty
                                    </SelectItem>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </label>
                    </div>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </>
    );
}
