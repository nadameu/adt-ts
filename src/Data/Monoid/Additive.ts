import { Generic1, Type } from '../../Generic';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Foldable } from '../Foldable';
import { Monoid, Monoid1 } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup } from '../Semigroup';
import { Semiring } from '../Semiring';
import { Show } from '../Show';

declare const AdditiveSymbol: unique symbol;
export type Additive<a> = a & { [AdditiveSymbol]: 'Additive' };
export interface GenericAdditive extends Generic1 {
	type: Additive<this['a']>;
}

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

const foldr: <a, b>(f: (_: a) => (_: b) => b) => (z: b) => (fa: Additive<a>) => b = f => z => x =>
	f(x)(z);
const foldl: <a, b>(f: (_: b) => (_: a) => b) => (z: b) => (fa: Additive<a>) => b = f => z => x =>
	f(z)(x);
const foldMap: {
	<m extends Generic1>(monoid: Monoid1<m>): <a, b>(
		f: (_: a) => Type<m, b>,
	) => (fa: Additive<a>) => Type<m, b>;
	<m>(monoid: Monoid<m>): <a>(f: (_: a) => m) => (fa: Additive<a>) => m;
} = <m>(_monoid: Monoid<m>) => <a>(f: (_: a) => m) => (fa: Additive<a>): m => f(fa);
export const foldableAdditive: Foldable<GenericAdditive> = {
	foldr,
	foldl,
	foldMap,
};
