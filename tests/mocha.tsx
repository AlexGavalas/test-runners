import { render, screen } from '@testing-library/react';
import { App } from '../src/app';
import assert from 'node:assert';
import { testRuns } from '../config';

const sum = (a: number, b: number) => a + b;

for (let i = 0; i < testRuns; i++) {
    it(`sum ${i}`, () => {
        assert.equal(sum(1, 2), 3);
    });

    it(`<App /> ${i}`, () => {
        render(<App />);
        const button = screen.getByRole('button');
        assert.equal(button.textContent, 'Count is: 0');
    });
}
