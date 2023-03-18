import './App.css';
import { fetchTrivia } from './fetchTrivia.js';

function App() {
    fetchTrivia(1, "bananas")
        .then((res) => {
            console.log(res);
        });
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    );
}

export default App;
