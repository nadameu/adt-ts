import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Monoid } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup } from '../Semigroup';
import { Semiring } from '../Semiring';
import { Show } from '../Show';

declare const MultiplicativeSymbol: unique symbol;
export type Multiplicative<a> = a & { [MultiplicativeSymbol]: 'Multiplicative' };

export const makeEqMultiplicative = <a>(eqA: Eq<a>): Eq<Multiplicative<a>> => eqA;
export const makeOrdMultiplicative = <a>(ordA: Ord<a>): Ord<Multiplicative<a>> => ordA;
export const makeBoundedMultiplicative = <a>(boundedA: Bounded<a>): Bounded<Multiplicative<a>> =>
	boundedA as any;
export const makeShowMultiplicative = <a>(showA: Show<a>): Show<Multiplicative<a>> => ({
	show: x => `(Multiplicative ${showA.show(x)})`,
});

// TODO: Functor, Apply, Applicative, Bind, Monad

export const makeSemigroupMultiplicative = <a>(
	semiringA: Semiring<a>,
): Semigroup<Multiplicative<a>> => ({
	append: x => y => semiringA.mul(x)(y) as Multiplicative<a>,
});
export const makeMonoidMultiplicative = <a>(semiringA: Semiring<a>): Monoid<Multiplicative<a>> => ({
	...makeSemigroupMultiplicative(semiringA),
	mempty: () => semiringA.one as Multiplicative<a>,
});
