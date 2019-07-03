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
import { Int } from './Int';
import { EuclidianRing } from './EuclidianRing';

export const eq: (x: number) => (y: number) => boolean = refEq;
export const eqNumber: Eq<number> = { eq };

export const compare: (x: number) => (y: number) => Ordering = unsafeCompareImpl;
export const ordNumber: Ord<number> = { eq, compare };

export const top = Number.POSITIVE_INFINITY;
export const bottom = Number.NEGATIVE_INFINITY;
export const boundedInt: Bounded<number> = { eq, compare, top, bottom };

export const show = (x: number): string => {
	const str = x.toString();
	return isNaN(`${str}.0` as any) ? str : `${str}.0`;
};
export const showNumber: Show<number> = { show };

export const add = (x: number) => (y: number): number => x + y;
export const zero = 0 as number;
export const mul = (x: number) => (y: number): number => x * y;
export const one = 1 as number;
export const semiringNumber: Semiring<number> = { add, zero, mul, one };

export const sub = (x: number) => (y: number): number => x - y;
export const ringNumber: Ring<number> = { add, zero, mul, one, sub };

export const commutativeRingNumber: CommutativeRing<number> = ringNumber;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const degree = (x: number): Int => 1 as Int;
export const div = (x: number) => (y: number): number => x / y;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mod = (x: number) => (y: number): number => 0;
export const euclidianRingNumber: EuclidianRing<number> = {
	add,
	zero,
	mul,
	one,
	sub,
	degree,
	div,
	mod,
};
