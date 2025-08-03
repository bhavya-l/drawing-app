import React from 'react';
import './App.css';
import CanvasBoard from './components/Canvas';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <CanvasBoard />
          <Toolbar />
      </header>
    </div>
  );
}

export default App;
