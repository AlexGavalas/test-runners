import { render, screen } from '@testing-library/react';
import { App } from '../src/app';

const sum = (a: number, b: number) => a + b;

it('sum', () => {
    expect(sum(1, 2)).toBe(3);
});

it('<App />', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Count is: 0');
});
