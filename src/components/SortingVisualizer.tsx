import React from 'react';
import { Button } from '@material-ui/core';
import {
  insertionSort,
  bubbleSort,
  mergeSort,
} from '../utils/sortingAlgorithms';
import { ArrayState, AnimationObject, SortingVisualizerProps } from '../utils/types';
import '../styles/SortingVisualizer.css';

// configuration
const MIN_BAR_HEIGHT = 10;
const MAX_BAR_HEIGHT = 580;
const NUM_BARS = 300;
const DEFAULT_BAR_COLOUR = '#660099';
const SORTED_BAR_COLOUR = '#0000FF';
const INSERTION_POINT_BAR_COLOUR = '#0000FF';
const SWAPPING_POINT_BAR_COLOUR = '#FF00CC';
const ANIMATION_SPEED_MS = 0.01;

export class SortingVisualizer extends React.Component<unknown, ArrayState> {
  static async resetInsertionBar(
    insertionPoint: number,
    idx: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
        'num-bar',
      );
      const insertionBar = currArrayBars[insertionPoint] as HTMLElement;
      insertionBar.style.backgroundColor = DEFAULT_BAR_COLOUR;
      setTimeout(() => {
        resolve();
      }, idx * ANIMATION_SPEED_MS);
    });
  }

  static resolveComparingBars(
    currentSwapIndices: number[],
    currentSwap: number[],
  ): void {
    const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'num-bar',
    );
    if (currentSwap) {
      for (let i = 0; i < currentSwap.length; i += 1) {
        const currBar = currArrayBars[currentSwapIndices[i]] as HTMLElement;
        currBar.style.height = `${currentSwap[i]}px`;
      }
    }
    currentSwapIndices.forEach((value) => {
      const currBar = currArrayBars[value] as HTMLElement;
      currBar.style.backgroundColor = DEFAULT_BAR_COLOUR;
    });
  }

  static mergeSortResolveComparingBars(
    currentSwapIndices: number[],
    currentSwap: number[],
  ): void {
    const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'num-bar',
    );
    if (currentSwap) {
      const currBar = currArrayBars[currentSwap[0]] as HTMLElement;
      currBar.style.height = `${currentSwap[1]}px`;
    }
    currentSwapIndices.forEach((value) => {
      const currBar = currArrayBars[value] as HTMLElement;
      currBar.style.backgroundColor = DEFAULT_BAR_COLOUR;
    });
  }

  static async highlightComparingBars(
    indexA: number,
    indexB: number,
    idx: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
        'num-bar',
      );
      const barA = currArrayBars[indexA] as HTMLElement;
      const barB = currArrayBars[indexB] as HTMLElement;
      barA.style.backgroundColor = SWAPPING_POINT_BAR_COLOUR;
      barB.style.backgroundColor = SWAPPING_POINT_BAR_COLOUR;
      setTimeout(() => {
        resolve();
      }, idx * ANIMATION_SPEED_MS);
    });
  }

  static highlightSortedBars(len: number, count: number): void {
    const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'num-bar',
    );
    const sortedIndices: number[] = [];
    while (count > 0) {
      sortedIndices.push(len - count);
      count -= 1;
    }

    sortedIndices.forEach((value) => {
      const currBar = currArrayBars[value] as HTMLElement;
      currBar.style.backgroundColor = SORTED_BAR_COLOUR;
    });
  }

  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static async doMergeAnimation(
    animation: AnimationObject,
    idx: number,
  ): Promise<void> {
    const { currentSwap } = animation;
    const { currentSwapIndices } = animation;

    if (currentSwap && currentSwapIndices) {
      await SortingVisualizer.highlightComparingBars(
        currentSwapIndices[0],
        currentSwapIndices[1],
        idx,
      ).then(() => {
        SortingVisualizer.mergeSortResolveComparingBars(
          currentSwapIndices,
          currentSwap,
        );
      });
    }
  }

  static async doInsertionAnimation(
    animation: AnimationObject,
    idx: number,
  ): Promise<void> {
    const { insertionPoint } = animation;
    const { currentSwap } = animation;
    const { currentSwapIndices } = animation;

    if (insertionPoint) {
      const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
        'num-bar',
      );
      const insertionBar = currArrayBars[insertionPoint] as HTMLElement;
      insertionBar.style.backgroundColor = INSERTION_POINT_BAR_COLOUR;
    }

    if (currentSwap && currentSwapIndices) {
      await SortingVisualizer.highlightComparingBars(
        currentSwapIndices[0],
        currentSwapIndices[1],
        idx,
      ).then(() => {
        SortingVisualizer.resolveComparingBars(currentSwapIndices, currentSwap);
      });
    } else if (insertionPoint) {
      await SortingVisualizer.resetInsertionBar(insertionPoint, idx);
    }
  }

  constructor(props: SortingVisualizerProps) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.scrambleArray();
    // for testing purposes
    /* let array: number[] = [500, 400, 300, 200, 100];
                this.setState({ array }); */
  }

  private scrambleArray = () => {
    const array: number[] = [];

    for (let i = 0; i < NUM_BARS; i += 1) {
      array.push(SortingVisualizer.randomInt(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
    }

    this.setState({ array });
  };

  private bubbleSortTrigger = async (): Promise<void> => {
    const { array } = this.state;
    let animations: AnimationObject[];
    try {
      if (array) {
        animations = bubbleSort(array);
        for (let i = 0; i < animations.length; i += 1) {
          await this.doBubbleAnimation(animations[i], i);
        }
      } else {
        console.log('Error: State array not initialized yet.');
      }
    } catch (err) {
      console.log('bubbleSortTrigger failed.');
    }
  };

  private insertionSortTrigger = async (): Promise<void> => {
    const { array } = this.state;
    let animations: AnimationObject[];
    try {
      if (array) {
        animations = insertionSort(array);
        for (let i = 0; i < animations.length; i += 1) {
          await SortingVisualizer.doInsertionAnimation(animations[i], i);
        }
      } else {
        console.log('Error: State array not initialized yet.');
      }
    } catch (err) {
      console.log('insertionSortTrigger failed.');
    }
  };

  private mergeSortTrigger = async (): Promise<void> => {
    const { array } = this.state;
    let animations: AnimationObject[];
    try {
      if (array) {
        animations = mergeSort(array);
        for (let i = 0; i < animations.length; i += 1) {
          await SortingVisualizer.doMergeAnimation(animations[i], i);
        }
      } else {
        console.log('Error: State array not initialized yet.');
      }
    } catch (err) {
      console.log('insertionSortTrigger failed.');
    }
  };

  private quickSortTrigger = () => {};

  private async doBubbleAnimation(
    animation: AnimationObject,
    idx: number,
  ): Promise<void> {
    const { bubbleSortedCount } = animation;
    const { currentSwap } = animation;
    const { currentSwapIndices } = animation;

    if (bubbleSortedCount) {
      const { array } = this.state;
      const len: number = array.length;
      SortingVisualizer.highlightSortedBars(len, bubbleSortedCount);
    }

    if (currentSwapIndices) {
      await SortingVisualizer.highlightComparingBars(
        currentSwapIndices[0],
        currentSwapIndices[1],
        idx,
      ).then(() => {
        if (currentSwap) {
          SortingVisualizer.resolveComparingBars(currentSwapIndices, currentSwap);
        }
      });
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="visualizer-window">
        <div className="bars-container">
          {array.map((value, idx) => (
            <div
              className="num-bar"
              key={idx}
              style={{
                backgroundColor: DEFAULT_BAR_COLOUR,
                height: `${value}px`,
              }}
            />
          ))}
        </div>
        <div className="button-group">
          <Button
            className="button"
            color="primary"
            variant="contained"
            onClick={this.quickSortTrigger}
            m-x={50}
          >
            Quick Sort
          </Button>
          <Button
            className="button"
            color="primary"
            variant="contained"
            onClick={this.mergeSortTrigger}
            m-x={100}
          >
            Merge Sort
          </Button>
          <Button
            className="button"
            color="secondary"
            variant="contained"
            onClick={this.scrambleArray}
          >
            Scramble Array
          </Button>
          <Button
            className="button"
            color="primary"
            variant="contained"
            onClick={this.insertionSortTrigger}
          >
            Insertion Sort
          </Button>
          <Button
            className="button"
            color="primary"
            variant="contained"
            onClick={this.bubbleSortTrigger}
          >
            Bubble Sort
          </Button>
        </div>
      </div>
    );
  }
}
