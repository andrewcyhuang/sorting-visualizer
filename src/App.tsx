import React from 'react';
import './App.css';
import { SortingVisualizer } from './components/SortingVisualizer';

function App() {
  return (
    <div className="app">
      <h1>Sorting Algorithm Visualizer</h1>
      <div className='visualizer-window'>
        <SortingVisualizer></SortingVisualizer>
      </div>
    </div>
  );
}

export default App;
