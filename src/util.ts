import { doNothing } from './helper';

export const sum = (a: number, b: number) => a + b + doNothing(a);
