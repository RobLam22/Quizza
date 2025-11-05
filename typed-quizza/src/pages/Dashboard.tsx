import PrevScores from '@/components/PreviousScores';
import SetupQuiz from '@/components/SetupQuiz';

export default function Dashboard() {
    return (
        <div className="md:flex md:justify-center items-center lg:mx-120">
            <div className="mx-auto p-6 md:p-4 flex justify-center">
                <SetupQuiz />
            </div>
            <div className="mx-auto p-6 md:p-4 flex justify-center">
                <PrevScores />
            </div>
        </div>
    );
}
