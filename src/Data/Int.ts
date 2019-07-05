import { Bounded } from './Bounded';
import { CommutativeRing } from './CommutativeRing';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { EuclidianRing } from './EuclidianRing';
import { fromMaybe, Just, Maybe, Nothing } from './Maybe';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Ring } from './Ring';
import { Semiring } from './Semiring';
import { Show } from './Show';

declare const IntSymbol: unique symbol;
export type Int = number & { [IntSymbol]: 'Int' };

export const eq: (x: Int) => (y: Int) => boolean = refEq;
export const eqInt: Eq<Int> = { eq };

export const compare: (x: Int) => (y: Int) => Ordering = unsafeCompareImpl;
export const ordInt: Ord<Int> = { ...eqInt, compare };

export const top = 2147483647 as Int;
export const bottom = -2147483648 as Int;
export const boundedInt: Bounded<Int> = { ...ordInt, top, bottom };

export const show = (x: Int): string => x.toString();
export const showInt: Show<Int> = { show };

export const add = (x: Int) => (y: Int): Int => ((x + y) | 0) as Int;
export const zero = 0 as Int;
export const mul = (x: Int) => (y: Int): Int => ((x * y) | 0) as Int;
export const one = 1 as Int;
export const semiringInt: Semiring<Int> = { add, zero, mul, one };

export const sub = (x: Int) => (y: Int): Int => ((x - y) | 0) as Int;
export const ringInt: Ring<Int> = { ...semiringInt, sub };

export const commutativeRingInt: CommutativeRing<Int> = ringInt;

export const degree = (x: Int): Int => Math.min(Math.abs(x), 2147483647) as Int;
export const div = (x: Int) => (y: Int): Int => {
	if (y === 0) return 0 as Int;
	return (y > 0 ? Math.floor(x / y) : -Math.floor(x / -y)) as Int;
};
export const mod = (x: Int) => (y: Int): Int => {
	if (y === 0) return 0 as Int;
	const yy = Math.abs(y);
	return (((x % yy) + yy) % yy) as Int;
};
export const euclidianRingInt: EuclidianRing<Int> = { ...commutativeRingInt, degree, div, mod };

export const fromNumber = (x: number): Maybe<Int> => ((x | 0) === x ? Just(x as Int) : Nothing);

export const ceil = (x: number): Int => unsafeClamp(Math.ceil(x));

export const floor = (x: number): Int => unsafeClamp(Math.floor(x));

export const round = (x: number): Int => unsafeClamp(Math.round(x));

const unsafeClamp = (x: number): Int =>
	x === Infinity
		? (0 as Int)
		: x === -Infinity
		? (0 as Int)
		: x >= top
		? top
		: x <= bottom
		? bottom
		: fromMaybe(0 as Int)(fromNumber(x));

export const toNumber = (x: Int): number => x;

export const fromString = (x: string): Maybe<Int> => fromStringAs(10 as Radix)(x);

declare const RadixSymbol: unique symbol;
export type Radix = Int & { [RadixSymbol]: 'Radix' };

export const binary = 2 as Radix;
export const octal = 8 as Radix;
export const decimal = 10 as Radix;
export const hexadecimal = 16 as Radix;
export const base36 = 36 as Radix;

export const radix = (x: Int): Maybe<Radix> => (x >= 2 && x <= 36 ? Just(x as Radix) : Nothing);

export const fromStringAs = (radix: Radix) => {
	const digits =
		radix < 11
			? `[0-${(radix - 1).toString()}]`
			: radix === 11
			? '[0-9a]'
			: `[0-9a-${String.fromCharCode(86 + radix)}]`;
	const pattern = new RegExp(`^[\\+\\-]?${digits}$`, 'i');
	return (s: string): Maybe<Int> => (pattern.test(s) ? fromNumber(parseInt(s, radix)) : Nothing);
};

export const toStringAs = (radix: Radix) => (i: Int): string => i.toString(radix);

export const quot = (x: Int) => (y: Int): Int => ((x / y) | 0) as Int;

export const rem = (x: Int) => (y: Int): Int => (x % y) as Int;

export const pow = (x: Int) => (y: Int): Int => (Math.pow(x, y) | 0) as Int;

declare const ParitySymbol: unique symbol;
export type Parity = Even | Odd;
export type Even = 0 & { [ParitySymbol]: 'Even' };
export const Even = 0 as Even;
export type Odd = 1 & { [ParitySymbol]: 'Odd' };
export const Odd = 1 as Odd;

export const parity = (x: Int): Parity => (even(x) ? Even : Odd);

export const even = (x: Int): boolean => (x & 1) === 0;

export const odd = (x: Int): boolean => (x & 1) !== 0;
