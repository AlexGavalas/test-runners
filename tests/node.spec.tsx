import { test, afterEach } from 'node:test';
import 'global-jsdom/register';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from '../src/app';
import assert from 'node:assert';
import { TEST_RUNS } from '../config';

const sum = (a: number, b: number) => a + b;

for (let i = 0; i < TEST_RUNS; i++) {
    afterEach(cleanup);

    test(`sum ${i}`, () => {
        assert.equal(sum(1, 2), 3);
    });

    test(`<App /> ${i}`, () => {
        render(<App />);
        const button = screen.getByRole('button');
        assert.equal(button.textContent, 'Count is: 0');
    });
}
