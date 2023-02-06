import assert from 'node:assert';
import 'global-jsdom/register';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from '../src/app';
import { TEST_RUNS } from '../config';

const sum = (a: number, b: number) => a + b;

export const testSum = () => {
    for (let i = 0; i < TEST_RUNS; i++) {
        assert.equal(sum(1, 2), 3);
    }
};

export const testApp = () => {
    for (let i = 0; i < TEST_RUNS; i++) {
        cleanup();
        render(<App />);
        const button = screen.getByRole('button');
        assert.equal(button.textContent, 'Count is: 0');
    }
};
