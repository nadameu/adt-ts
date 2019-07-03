import { CommutativeRing } from './CommutativeRing';
import { Eq, notEq } from './Eq';
import { Int } from './Int';

export interface EuclidianRing<a> extends CommutativeRing<a> {
	degree: (x: a) => Int;
	div: (x: a) => (y: a) => a;
	mod: (x: a) => (y: a) => a;
}

/** The *greatest common divisor* of two values. */
export const gcd = <a>(eqA: Eq<a>) => (euclidianRingA: EuclidianRing<a>) => (x: a) => (y: a): a => {
	const { mod, zero } = euclidianRingA;
	const notZero = notEq(eqA)(zero);
	let a = x;
	let b = y;
	while (notZero(b)) {
		const oldA = a;
		a = b;
		b = mod(oldA)(b);
	}
	return a;
};

/** The *least common multiple* of two values. */
export const lcm = <a>(eqA: Eq<a>) => (euclidianRingA: EuclidianRing<a>) => (x: a) => (y: a): a => {
	const { div, mul, zero } = euclidianRingA;
	const isZero = eqA.eq(zero);
	if (isZero(x) || isZero(y)) return zero;
	return div(mul(x)(y))(gcd(eqA)(euclidianRingA)(x)(y));
};
