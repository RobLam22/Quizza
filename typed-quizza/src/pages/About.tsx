export default function About() {
    return (
        <>
            <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
                <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
                    <div className="max-w-prose text-left">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            <strong className="text-indigo-600">About</strong>
                        </h1>

                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                            This webpage lets you setup a quiz of either 5 or 10
                            questions. It uses the Open Trivia API. The API call
                            can automatically use default parameters to generate
                            random questions for you to answer.
                        </p>
                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                            There is also settings for the quiz aside from just
                            the number of questions. You can set a category for
                            all your quiz questions. The difficulty can be
                            adjusted as well.
                        </p>
                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                            See how well you go with the questions! Keep playing
                            to generate new questions!
                        </p>

                        <div className="mt-4 flex gap-4 sm:mt-6">
                            <a className="inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-30 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                                Get Started
                            </a>
                        </div>
                    </div>
                    <div className="text-right text-xs text-gray-200">
                        <img src="./src/assets/about.jpg"></img>
                        <a href="https://www.freepik.com/free-vector/quiz-concept-question-marks-shape-speech-bubble_11060777.htm#fromView=keyword&page=2&position=27&uuid=4dbe3ce1-f1c1-4d90-92f4-be5262212b2c&query=Quiz">
                            Image by macrovector on Freepik
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
