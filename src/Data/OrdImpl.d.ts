import { Char } from './Char';
import { Int } from './Int';
import { Ordering } from './Ordering';

export const ordBooleanImpl: (x: boolean) => (y: boolean) => Ordering;
export const ordIntImpl: (x: Int) => (y: Int) => Ordering;
export const ordNumberImpl: (x: number) => (y: number) => Ordering;
export const ordStringImpl: (x: string) => (y: string) => Ordering;
export const ordCharImpl: (x: Char) => (y: Char) => Ordering;

export const ordArrayImpl: <a>(
	f: (_: a) => (_: a) => Ordering,
) => (xs: a[]) => (ys: a[]) => Ordering;
