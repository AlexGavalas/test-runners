import { cleanup, render, screen } from '@testing-library/react';
import test from 'tape';

import { App } from '../src/app';
import { sum } from '../src/util';
import { TEST_RUNS } from '../config';

for (let i = 0; i < TEST_RUNS; i++) {
    test(`sum ${i}`, (t) => {
        t.plan(1);
        t.equal(sum(1, 2), 3);
    });

    test(`<App /> ${i}`, (t) => {
        t.plan(1);
        cleanup();
        render(<App />);
        const button = screen.getByRole('button');
        t.is(button.textContent, 'Count is: 0');
    });
}
