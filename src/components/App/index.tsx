import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { SortingVisualizer } from '../SortingVisualizer';
import useStyles from './styles';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
          <div className={classes.header}>
        <Container>
        

            <h1>Sorting Algorithm Visualizer</h1>
        </Container>
      </div>
      <div>
        <SortingVisualizer />
      </div>
    </div>
  );
};

export default App;
