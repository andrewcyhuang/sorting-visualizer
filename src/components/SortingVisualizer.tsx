import React from 'react';
import { ArrayState } from '../types';
import { Button } from '@material-ui/core';
import '../styles/SortingVisualizer.css'

// configuration
const MIN_BAR_HEIGHT: number = 10;
const MAX_BAR_HEIGHT: number = 580;
const NUM_BARS: number = 300;

export class SortingVisualizer extends React.Component<{}, ArrayState> {
    constructor(props: any) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.scrambleArray();
    }

    render() {
        const { array } = this.state;

        return (
            <div className='visualizer-window'>
                <div className='bars-container'>
                    {
                        array.map((value, idx) => (
                            <div
                                className='bar'
                                key={idx}
                                style={{
                                    backgroundColor: '#008080',
                                    filter: `brightness(
                                    ${
                                        (value / MAX_BAR_HEIGHT) > .1 ? .95 - (value / MAX_BAR_HEIGHT) : .05
                                        })`,
                                    height: `${value}px`,
                                }}
                            />
                        ))
                    }
                </div>
                <div className='button-group'>
                    <Button className='button' color='primary' variant='contained' onClick={this.quickSort}>Quick Sort</Button>
                    <Button className='button' color='primary' variant='contained' onClick={this.mergeSort}>Merge Sort</Button>
                    <Button className='button' color='secondary' variant='contained' onClick={this.scrambleArray}>Scramble Array</Button>
                    <Button className='button' color='primary' variant='contained' onClick={this.insertionSort}>Insertion Sort</Button>
                    <Button className='button' color='primary' variant='contained' onClick={this.bubbleSort}>Bubble Sort</Button>
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

    quickSort = () => {

    }

    mergeSort = () => {

    }

    insertionSort = () => {

    }

    bubbleSort = () => {

    }

    randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}