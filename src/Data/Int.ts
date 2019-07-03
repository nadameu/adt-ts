import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Ring } from './Ring';
import { Semiring } from './Semiring';
import { Show } from './Show';
import { CommutativeRing } from './CommutativeRing';
import { EuclidianRing } from './EuclidianRing';

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
