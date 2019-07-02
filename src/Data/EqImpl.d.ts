import { Char } from './Char';
import { Int } from './Int';

export const eqBooleanImpl: (x: boolean) => (y: boolean) => boolean;
export const eqIntImpl: (x: Int) => (y: Int) => boolean;
export const eqNumberImpl: (x: number) => (y: number) => boolean;
export const eqCharImpl: (x: Char) => (y: Char) => boolean;
export const eqStringImpl: (x: string) => (y: string) => boolean;
export const eqArrayImpl: <a>(f: (_: a) => (_: a) => boolean) => (xs: a[]) => (ys: a[]) => boolean;
