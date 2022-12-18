import 'global-jsdom/register';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { render, screen } from '@testing-library/react';
import { App } from '../src/app';

const sum = (a: number, b: number) => a + b;

test('sum', () => {
    assert.is(sum(1, 2), 3);
});

test('<App />', () => {
    render(<App />);
    const button = screen.getByRole('button');
    assert.is(button.textContent, 'Count is: 0');
});

test.run();
