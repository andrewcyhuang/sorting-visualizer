import React from 'react';
import { insertionSort, bubbleSort } from '../utils/sortingAlgorithms';
import { ArrayState, AnimationObject } from '../utils/types';
import { Button } from '@material-ui/core';
import '../styles/SortingVisualizer.css'

// configuration
const MIN_BAR_HEIGHT: number = 10;
const MAX_BAR_HEIGHT: number = 580;
const NUM_BARS: number = 300;
const DEFAULT_BAR_COLOUR: string = '#660099';
const SORTED_BAR_COLOUR: string = '#0000FF';
const INSERTION_POINT_BAR_COLOUR: string = '#0000FF';
const SWAPPING_POINT_BAR_COLOUR: string = '#FF00CC';
const ANIMATION_SPEED_MS: number = 0.1;

export class SortingVisualizer extends React.Component<{}, ArrayState> {
    constructor(props: any) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.scrambleArray();
        // for testing purposes
        /* let array: number[] = [500, 400, 300, 200, 100];
        this.setState({ array }); */
    }

    render() {
        const { array } = this.state;

        return (
            <div className='visualizer-window'>
                <div className='bars-container'>
                    {
                        array.map((value, idx) => (
                            <div
                                className='num-bar'
                                key={idx}
                                style={{
                                    backgroundColor: DEFAULT_BAR_COLOUR,
                                    height: `${value}px`,
                                }}
                            />
                        ))
                    }
                </div>
                <div className='button-group'>
                    <Button className='button' color='primary' variant='contained' onClick={this.quickSortTrigger}>Quick Sort</Button>
                    <Button className='button' color='primary' variant='contained' onClick={this.mergeSortTrigger}>Merge Sort</Button>
                    <Button className='button' color='secondary' variant='contained' onClick={this.scrambleArray}>Scramble Array</Button>
                    <Button className='button' color='primary' variant='contained' onClick={this.insertionSortTrigger}>Insertion Sort</Button>
                    <Button className='button' color='primary' variant='contained' onClick={this.bubbleSortTrigger}>Bubble Sort</Button>
                </div>
            </div>
        )
    };

    scrambleArray = () => {
        const array: number[] = [];

        for (let i: number = 0; i < NUM_BARS; i++) {
            array.push(this.randomInt(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
        }

        this.setState({ array });
    }

    quickSortTrigger = () => {

    }

    mergeSortTrigger = () => {

    }

    insertionSortTrigger = async () => {
        let bars: number[] = this.state.array;
        let animations: AnimationObject[];
        try {
            if (bars) {
                animations = insertionSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                    await this.doInsertionAnimation(animations[i], i);
                }
            } else {
                console.log('Error: State array not initialized yet.');
            }
        } catch (err) {
            console.log(`insertionSortTrigger failed. ${err.message}`);
        }
    }

    bubbleSortTrigger = async () => {
        let bars: number[] = this.state.array;
        let animations: AnimationObject[];
        try {
            if (bars) {
                animations = bubbleSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                    await this.doBubbleAnimation(animations[i], i);
                }
            } else {
                console.log('Error: State array not initialized yet.');
            }
        } catch (err) {
            console.log(`bubbleSortTrigger failed. ${err.message}`);
        }
    }

    randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Insertion Sort Animation Implementation - TODO: Refactor for increased cohesion once requirements for other sort animations are fully defined!!!
    doInsertionAnimation = async (animation: AnimationObject, idx: number): Promise<void> => {
        const insertionPoint: number | undefined = animation.insertionPoint;
        const currentSwap: number[] | undefined = animation.currentSwap;
        const currentSwapIndices: number[] | undefined = animation.currentSwapIndices;

        if (insertionPoint) {
            const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
            const insertionBar = currArrayBars[insertionPoint] as HTMLElement;
            insertionBar.style.backgroundColor = INSERTION_POINT_BAR_COLOUR;
        };

        if (currentSwap && currentSwapIndices) {
            await this.highlightComparingBars(
                currentSwapIndices[0],
                currentSwapIndices[1],
                idx)
                .then(() => {
                    this.resolveComparingBars(currentSwapIndices, currentSwap);
                });
        } else {
            if (insertionPoint) {
                await this.resetInsertionBar(insertionPoint, idx);
            };
        };
    }

    doBubbleAnimation = async (animation: AnimationObject, idx: number): Promise<void> => {
        const bubbleSortedCount: number | undefined = animation.bubbleSortedCount;
        const currentSwap: number[] | undefined = animation.currentSwap;
        const currentSwapIndices: number[] | undefined = animation.currentSwapIndices;

        if (bubbleSortedCount) {
            const len: number = this.state.array.length;
            this.highlightSortedBars(len, bubbleSortedCount);
        }

        if (currentSwapIndices) {
            await this.highlightComparingBars(
                currentSwapIndices[0],
                currentSwapIndices[1],
                idx).then(() => {
                    this.resolveComparingBars(currentSwapIndices, currentSwap!);
                });
        }
    }

    highlightComparingBars = async (indexA: number, indexB: number, idx: number): Promise<void> => {
        return new Promise(resolve => {
            const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
            const barA = currArrayBars[indexA] as HTMLElement;
            const barB = currArrayBars[indexB] as HTMLElement;
            barA.style.backgroundColor = SWAPPING_POINT_BAR_COLOUR;
            barB.style.backgroundColor = SWAPPING_POINT_BAR_COLOUR;
            setTimeout(() => {
                resolve();
            }, idx * ANIMATION_SPEED_MS);
        })
    };

    highlightSortedBars = (len: number, count: number): void => {
        const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
        const sortedIndices: number[] = [];
        while (count > 0) {
            sortedIndices.push(len - count);
            count--;
        }

        sortedIndices.forEach(value => {
            const currBar = currArrayBars[value] as HTMLElement;
            currBar.style.backgroundColor = SORTED_BAR_COLOUR;
        });
    }

    resolveComparingBars = async (currentSwapIndices: number[], currentSwap: number[]): Promise<void> => {
        const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
        if (currentSwap) {
            for (let i = 0; i < currentSwap.length; i++) {
                const currBar = currArrayBars[currentSwapIndices[i]] as HTMLElement;
                currBar.style.height = `${currentSwap[i]}px`;
            }
        }
        currentSwapIndices.forEach(value => {
            const currBar = currArrayBars[value] as HTMLElement;
            currBar.style.backgroundColor = DEFAULT_BAR_COLOUR;
        });
    }

    resetInsertionBar = async (insertionPoint: number, idx: number): Promise<void> => {
        return new Promise(resolve => {
            const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
            const insertionBar = currArrayBars[insertionPoint] as HTMLElement;
            insertionBar.style.backgroundColor = DEFAULT_BAR_COLOUR;
            setTimeout(() => {
                resolve();
            }, idx * ANIMATION_SPEED_MS);
        })
    }
}