import React from 'react';
import { Button } from '@material-ui/core';
import { insertionSort } from '../algorithms/insertionSort';
import { bubbleSort } from '../algorithms/bubbleSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import { VisualizerState, AnimationObject, SortingVisualizerProps } from '../utils/types';
import '../styles/SortingVisualizer.css';
import { randomInt } from '../utils/util';
import { DEFAULT_BAR_COLOUR, SWAPPING_POINT_BAR_COLOUR, ANIMATION_SPEED_MS, INSERTION_POINT_BAR_COLOUR, SORTED_BAR_COLOUR, MIN_BAR_HEIGHT, BAR_WIDTH, NUM_BARS, MAX_BAR_HEIGHT, BAR_GAP } from '../utils/config';

export class SortingVisualizer extends React.Component<unknown, VisualizerState> {
  constructor(props: SortingVisualizerProps) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.scrambleArray();
    // for testing purposes
    // let array: number[] = [534, 893, 543, 643, 100, 432, 456, 300, 400, 562, 325];
    // this.setState({ array });
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
        console.log(`${i}, ${currBar}`);
        currBar.style.height = `${currentSwap[i]}px`;
      }
    }
    currentSwapIndices.forEach((value) => {
      const currBar = currArrayBars[value] as HTMLElement;
      console.log(`${value}, ${currBar}`);
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

  static async toggleIndividualBar(
    stepper: number,
    idx: number,
    done: boolean = true,
    insertionBar: boolean = false
  ): Promise<void> {
    return new Promise((resolve) => {
      const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName(
        'num-bar',
      );
      const currBar = currArrayBars[stepper] as HTMLElement;

      const colour = done ? DEFAULT_BAR_COLOUR : insertionBar ? INSERTION_POINT_BAR_COLOUR : SWAPPING_POINT_BAR_COLOUR;
      currBar.style.backgroundColor = colour;
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

  private async doBubbleAnimation(
    animation: AnimationObject,
    idx: number,
  ): Promise<void> {
    const { bubbleSortedCount, currentSwap, currentSwapIndices } = animation;

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
        };
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
      await SortingVisualizer.toggleIndividualBar(insertionPoint, idx, false, true);
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
      await SortingVisualizer.toggleIndividualBar(insertionPoint, idx, true);
    }
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

  static async doQuickAnimation(animation: AnimationObject, idx: number): Promise<void> {
    const { pivotIdx, leftIdx, rightIdx, done, currentSwap, currentSwapIndices } = animation;

    if (pivotIdx && pivotIdx > 0) {
      await SortingVisualizer.toggleIndividualBar(pivotIdx, idx, done);
    }

    if (leftIdx && leftIdx > 0) {
      await SortingVisualizer.toggleIndividualBar(leftIdx, idx, done);
    }

    if (rightIdx && rightIdx > 0) {
      await SortingVisualizer.toggleIndividualBar(rightIdx, idx, done);
    }

    if (currentSwapIndices) {
      await SortingVisualizer.highlightComparingBars(
        currentSwapIndices[0],
        currentSwapIndices[1],
        idx,
      ).then(() => {
        if (currentSwap) {
          SortingVisualizer.resolveComparingBars(currentSwapIndices, currentSwap);
        };
      }).catch(e => {
        console.log(`resolving comparing bars failed: ${e}. Inputs: ${currentSwap}, ${currentSwapIndices}`)
      });
    }
  }

  private scrambleArray = () => {
    const array: number[] = [];

    for (let i = 0; i < NUM_BARS; i += 1) {
      array.push(randomInt(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
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
      console.log('mergeSortTrigger failed.');
    }
  };

  private quickSortTrigger = async (): Promise<void> => {
    const { array } = this.state;
    let animations: AnimationObject[];

    if (array) {
      animations = quickSort(array);
      let i: number = 0;
      try {
        for (i = 0; i < animations.length; i += 1) {
          await SortingVisualizer.doQuickAnimation(animations[i], i);
        }
      } catch (e) {
        console.log(`doQuickAnimation failed ${e} curr: ${JSON.stringify(animations[i])}`);
      };
    } else {
      console.log('Error: State array not initialized yet.');
    }
  };

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
                width:  `${BAR_WIDTH}px`,
                marginRight: `${BAR_GAP}px`
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
