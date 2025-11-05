import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

export default function App() {
    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
}
