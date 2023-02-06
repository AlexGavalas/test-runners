import { cleanup, render, screen } from '@testing-library/react';
import tap from 'tap';

import { App } from '../src/app';
import { sum } from '../src/util';
import { TEST_RUNS } from '../config';

for (let i = 0; i < TEST_RUNS; i++) {
    tap.afterEach(cleanup);

    tap.test(`sum ${i}`, (t) => {
        t.plan(1);
        t.equal(sum(1, 2), 3);
        t.end();
    });

    tap.test(`<App /> ${i}`, (t) => {
        render(<App />);
        const button = screen.getByRole('button');
        t.equal(button.textContent, 'Count is: 0');
        t.end();
    });
}
