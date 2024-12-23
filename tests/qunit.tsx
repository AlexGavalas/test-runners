import { cleanup, render, screen } from '@testing-library/react';

import { App } from '../src/app';
import { sum } from '../src/util';
import { TEST_RUNS } from '../config';

for (let i = 0; i < TEST_RUNS; i++) {
    QUnit.hooks.afterEach(() => {
        cleanup();
    });

    QUnit.test(`sum ${i}`, (assert) => {
        assert.equal(sum(1, 2), 3);
    });

    QUnit.test(`<App /> ${i}`, (assert) => {
        render(<App />);
        const button = screen.getByRole('button');
        assert.equal(button.textContent, 'Count is: 0');
    });
}
