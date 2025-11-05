import { Link } from 'react-router-dom';

export default function LandingTrue() {
    return (
        <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
            <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        What Do You Know? Do You Know Things?
                        <strong className="text-indigo-600">
                            {' '}
                            Let's Find Out!
                        </strong>
                    </h1>

                    <p className="mt-4 text-base text-pretty text-gray-900 sm:text-lg/relaxed">
                        Test yourself and what you know!
                    </p>

                    <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                        <Link
                            className="inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-md transition-colors hover:bg-indigo-700"
                            to="/setup"
                        >
                            Find Out!
                        </Link>

                        <Link
                            className="inline-block rounded-md border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-md transition-colors hover:bg-gray-50 hover:text-gray-900"
                            to="/about"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
