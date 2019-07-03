import { Char } from './Char';
import { Int } from './Int';

export const showIntImpl: (n: Int) => string;
export const showNumberImpl: (n: number) => string;
export const showCharImpl: (c: Char) => string;
export const showStringImpl: (s: string) => string;
export const showArrayImpl: <a>(f: (_: a) => string) => (xs: a[]) => string;
