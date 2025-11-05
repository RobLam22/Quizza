import { createBrowserRouter } from 'react-router-dom';
import { SignupForm } from './components/signup-form';
import { LoginForm } from './components/login-form';
import Layout from './components/Layout.tsx';
import LandingTrue from './pages/Home.tsx';
import SetupQuiz from './components/SetupQuiz.tsx';
import About from './pages/About.tsx';
import { Quiz } from './pages/Quiz.tsx';
import Leaderboard from './pages/Leaderboard.tsx';
import Dashboard from './pages/Dashboard.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LandingTrue />,
            },
            {
                path: 'login',
                element: <LoginForm />,
            },
            {
                path: 'signup',
                element: <SignupForm />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/setup',
                element: <SetupQuiz />,
            },
            {
                path: '/quiz',
                element: <Quiz />,
            },
            {
                path: '/leaderboard',
                element: <Leaderboard />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
]);
