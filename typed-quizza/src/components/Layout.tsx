import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="app-layout">
            <Header />
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
