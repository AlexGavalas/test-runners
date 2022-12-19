import { render, screen } from '@testing-library/react';
import { App } from '../src/app';
import { testRuns } from '../config';

const sum = (a: number, b: number) => a + b;

for (let i = 0; i < testRuns; i++) {
    it(`sum ${i}`, () => {
        expect(sum(1, 2)).toBe(3);
    });

    it(`<App /> ${i}`, () => {
        render(<App />);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Count is: 0');
    });
}
