import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Monoid } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup } from '../Semigroup';
import { Semiring } from '../Semiring';
import { Show } from '../Show';

declare const AdditiveSymbol: unique symbol;
export type Additive<a> = a & { [AdditiveSymbol]: 'Additive' };

export const makeEqAdditive = <a>(eqA: Eq<a>): Eq<Additive<a>> => eqA;
export const makeOrdAdditive = <a>(ordA: Ord<a>): Ord<Additive<a>> => ordA;
export const makeBoundedAdditive = <a>(boundedA: Bounded<a>): Bounded<Additive<a>> =>
	boundedA as any;
export const makeShowAdditive = <a>(showA: Show<a>): Show<Additive<a>> => ({
	show: x => `(Additive ${showA.show(x)})`,
});

// TODO: Functor, Apply, Applicative, Bind, Monad

export const makeSemigroupAdditive = <a>(semiringA: Semiring<a>): Semigroup<Additive<a>> => ({
	append: x => y => semiringA.add(x)(y) as Additive<a>,
});
export const makeMonoidAdditive = <a>(semiringA: Semiring<a>): Monoid<Additive<a>> => ({
	...makeSemigroupAdditive(semiringA),
	mempty: () => semiringA.zero as Additive<a>,
});
