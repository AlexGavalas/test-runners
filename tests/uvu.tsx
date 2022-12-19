import 'global-jsdom/register';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from '../src/app';
import { testRuns } from '../config';

const sum = (a: number, b: number) => a + b;

for (let i = 0; i < testRuns; i++) {
    test.after.each(cleanup);

    test(`sum ${i}`, () => {
        assert.is(sum(1, 2), 3);
    });

    test(`<App /> ${i}`, () => {
        render(<App />);
        const button = screen.getByRole('button');
        assert.is(button.textContent, 'Count is: 0');
    });
}

test.run();
