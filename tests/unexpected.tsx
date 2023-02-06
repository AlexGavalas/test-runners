import expect from 'unexpected';
import { render, screen } from '@testing-library/react';

import { App } from '../src/app';
import { sum } from '../src/util';
import { TEST_RUNS } from '../config';

for (let i = 0; i < TEST_RUNS; i++) {
    it(`sum ${i}`, () => {
        expect(sum, 'to be a', 'function');
    });

    it(`<App /> ${i}`, () => {
        render(<App />);
        const button = screen.getByRole('button');
        expect(button.textContent, 'to be', 'Count is: 0');
    });
}
