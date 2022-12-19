import 'global-jsdom/register';
import { cleanup, render, screen } from '@testing-library/react';
import test from 'ava';
import { App } from '../src/app';
import { testRuns } from '../config';

const sum = (a: number, b: number) => a + b;

for (let i = 0; i < testRuns; i++) {
    test.afterEach(cleanup);

    test(`sum ${i}`, (t) => {
        t.is(sum(1, 2), 3);
    });

    test.serial(`<App /> ${i}`, (t) => {
        render(<App />);
        const button = screen.getByRole('button');
        t.is(button.textContent, 'Count is: 0');
    });
}
