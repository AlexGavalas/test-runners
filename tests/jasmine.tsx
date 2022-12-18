import 'global-jsdom/register';
import { render, screen } from '@testing-library/react';
import { App } from '../src/app';
import assert from 'node:assert';

const sum = (a: number, b: number) => a + b;

it('sum', () => {
    assert.equal(sum(1, 2), 3);
});

it('<App />', () => {
    render(<App />);
    const button = screen.getByRole('button');
    assert.equal(button.textContent, 'Count is: 0');
});
