import 'global-jsdom/register';

import { render, screen } from '@testing-library/react';
import test from 'ava';
import { App } from '../src/app';

const sum = (a: number, b: number) => a + b;

test('sum', (t) => {
    t.is(sum(1, 2), 3);
});

test('<App />', (t) => {
    render(<App />);
    const button = screen.getByRole('button');
    t.is(button.textContent, 'Count is: 0');
});
