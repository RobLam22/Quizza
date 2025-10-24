import { createBrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import Landing from './components/Landing';
import { SignupForm } from './components/signup-form';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
]);
