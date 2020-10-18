import React from 'react';
import { SortingVisualizer } from '../SortingVisualizer';
import useStyles from './styles';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Sorting Algorithm Visualizer</h1>
      <div className="visualizer-window">
        <SortingVisualizer />
      </div>
    </div>
  );
};

export default App;
