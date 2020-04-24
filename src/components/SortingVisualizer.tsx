import React from 'react';
import { insertionSort } from '../utils/sortingAlgorithms';
import { ArrayState, InsertionSortAnimation } from '../utils/types';
import { Button } from '@material-ui/core';
import '../styles/SortingVisualizer.css'

// configuration
const MIN_BAR_HEIGHT: number = 10;
const MAX_BAR_HEIGHT: number = 580;
const NUM_BARS: number = 300;
const DEFAULT_BAR_COLOUR: string = '#660099';
const INSERTION_POINT_BAR_COLOUR: string = '#0000FF';
const SWAPPING_POINT_BAR_COLOUR: string = '#FF00CC';
const ANIMATION_SPEED_MS: number = 0.03;

export class SortingVisualizer extends React.Component<{}, ArrayState> {
    constructor(props: any) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.scrambleArray();
        /* let array: number[] = [500, 400, 300];
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
                                    /* filter: `brightness(
                                    ${
                                        (value / MAX_BAR_HEIGHT) > .1 ? .95 - (value / MAX_BAR_HEIGHT) : .05
                                        })`, */
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
        let animations: InsertionSortAnimation[];
        try {
            if (bars) {
                animations = insertionSort(this.state.array);
                for (let i = 0; i < animations.length; i++) {
                    await this.doAnimation(animations[i], i);
                }
            } else {
                console.log('Error: State array not initialized yet.');
            }
        } catch (err) {
            console.log(`insertionSortTrigger failed. ${err.message}`);
        }
    }

    bubbleSortTrigger = () => {

    }

    randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    doAnimation = async (animation: InsertionSortAnimation, idx: number): Promise<void> => {
        const insertionPoint: number = animation.insertionPoint;
        const currentSwap: number | undefined = animation.currentSwap;
        const currentSwapIndices: number[] | undefined = animation.currentSwapIndices;

        const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
        const insertionBar = currArrayBars[insertionPoint] as HTMLElement;
        insertionBar.style.backgroundColor = INSERTION_POINT_BAR_COLOUR;

        if (currentSwap && currentSwapIndices) {
            await this.highlightComparingBars(
                currentSwapIndices[0],
                currentSwapIndices[1],
                idx)
                .then(() => {
                    this.resolveComparingBars(currentSwapIndices[0], currentSwapIndices[1], currentSwap);
                });
        } else {
            await this.resetInsertionBar(insertionPoint, idx);
        };
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
            }, ANIMATION_SPEED_MS);
        })
    };

    resolveComparingBars = async (indexA: number, indexB: number, currentSwap: number): Promise<void> => {
        const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
        const barA = currArrayBars[indexA] as HTMLElement;
        const barB = currArrayBars[indexB] as HTMLElement;
        if (currentSwap) {
            barA.style.height = `${currentSwap}px`;
            /* barA.style.filter = `brightness(
                ${
                (currentSwap / MAX_BAR_HEIGHT) > .1 ? .95 - (currentSwap / MAX_BAR_HEIGHT) : .05
                })` */
        }
        barA.style.backgroundColor = DEFAULT_BAR_COLOUR;
        barB.style.backgroundColor = DEFAULT_BAR_COLOUR;
    }

    resetInsertionBar = async (insertionPoint: number, idx: number): Promise<void> => {
        return new Promise(resolve => {
            const currArrayBars: HTMLCollectionOf<Element> = document.getElementsByClassName('num-bar');
            const insertionBar = currArrayBars[insertionPoint] as HTMLElement;
            insertionBar.style.backgroundColor = DEFAULT_BAR_COLOUR;
            setTimeout(() => {
                resolve();
            }, ANIMATION_SPEED_MS);
        })
    }
}