import { useState } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import './App.css';

function App() {
    const [start, setStart] = useState(false);

    function startQuiz() {
        setStart((prevState) => !prevState);
        console.log(start);
    }

    return (
        <section className="page">
            {start ? <Home onClick={startQuiz} /> : <Quiz />}
        </section>
    );
}

export default App;
