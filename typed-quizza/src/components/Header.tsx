import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useState } from 'react';

export default function Header() {
    const { session, signOutUser } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    console.log(session != null);

    const handleSignOut = async (e) => {
        e.preventDefault();

        const { success, error } = await signOutUser();
        if (success) {
            navigate('/');
        } else {
            setError(error.message);
        }
    };

    return (
        <header className="bg-white">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-500 transition hover:text-gray-500/75"
                                >
                                    {' '}
                                    Home{' '}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-500 transition hover:text-gray-500/75"
                                >
                                    {' '}
                                    About{' '}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/leaderboard"
                                    className="text-gray-500 transition hover:text-gray-500/75"
                                >
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            {!session ? (
                                <Link
                                    className="block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            ) : (
                                <Link
                                    className="block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
                                    to="/dashboard"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {!session ? (
                                <Link
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600 transition hover:text-black
                                    /75 sm:block"
                                    to="/signup"
                                >
                                    Sign Up
                                </Link>
                            ) : (
                                <Link
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-black/75 sm:block"
                                    to="/Dashboard"
                                    onClick={handleSignOut}
                                >
                                    Logout
                                </Link>
                            )}
                        </div>

                        <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
//   {error && (
//     <div role="role" className="error-message" id="signout-error">
//       {error}
//     </div>
//   )}
