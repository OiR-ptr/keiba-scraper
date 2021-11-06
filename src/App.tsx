import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>

      <main>
        <h2>{process.env.REACT_APP_HASURA_API_KEY}</h2>
      </main>
    </div>
  );
}

export default App;
