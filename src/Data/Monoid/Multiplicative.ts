import { Generic1, Type } from '../../Generic';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Foldable } from '../Foldable';
import { Monoid, Monoid1 } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup } from '../Semigroup';
import { Semiring } from '../Semiring';
import { Show } from '../Show';

declare const MultiplicativeSymbol: unique symbol;
export type Multiplicative<a> = a & { [MultiplicativeSymbol]: 'Multiplicative' };
export interface GenericMultiplicative extends Generic1 {
	type: Multiplicative<this['a']>;
}

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

const foldr: <a, b>(
	f: (_: a) => (_: b) => b,
) => (z: b) => (fa: Multiplicative<a>) => b = f => z => x => f(x)(z);
const foldl: <a, b>(
	f: (_: b) => (_: a) => b,
) => (z: b) => (fa: Multiplicative<a>) => b = f => z => x => f(z)(x);
const foldMap: {
	<m extends Generic1>(monoid: Monoid1<m>): <a, b>(
		f: (_: a) => Type<m, b>,
	) => (fa: Multiplicative<a>) => Type<m, b>;
	<m>(monoid: Monoid<m>): <a>(f: (_: a) => m) => (fa: Multiplicative<a>) => m;
} = <m>(_monoid: Monoid<m>) => <a>(f: (_: a) => m) => (fa: Multiplicative<a>): m => f(fa);
export const foldableMultiplicative: Foldable<GenericMultiplicative> = {
	foldr,
	foldl,
	foldMap,
};
