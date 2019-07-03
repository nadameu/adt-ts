import { Generic1, Type } from '../../Generic';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Monoid, Monoid1 } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup, Semigroup1 } from '../Semigroup';
import { Show } from '../Show';

declare const DualSymbol: unique symbol;
export type Dual<a> = a & { [DualSymbol]: 'Dual' };
export interface HigherKindedDual<f extends Generic1> extends Generic1 {
	type: Dual<Type<f, this['a']>>;
}

export const makeEqDual = <a>(eqA: Eq<a>): Eq<Dual<a>> => eqA;
export const makeOrdDual = <a>(ordA: Ord<a>): Ord<Dual<a>> => ordA;
export const makeBoundedDual = <a>(boundedA: Bounded<a>): Bounded<Dual<a>> => boundedA as any;
export const makeShowDual = <a>(showA: Show<a>): Show<Dual<a>> => ({
	show: x => `(Dual ${showA.show(x)})`,
});

// TODO: Functor, Apply, Applicative, Bind, Monad

export const makeSemigroupDual: {
	<f extends Generic1>(semigroup: Semigroup1<f>): Semigroup1<HigherKindedDual<f>>;
	<a>(semigroupA: Semigroup<a>): Semigroup<Dual<a>>;
} = <a>(semigroupA: Semigroup<a>): Semigroup<Dual<a>> => ({
	append: x => y => semigroupA.append(y)(x) as Dual<a>,
});

export const makeMonoidDual: {
	<f extends Generic1>(monoid: Monoid1<f>): Monoid1<HigherKindedDual<f>>;
	<a>(monoidA: Monoid<a>): Monoid<Dual<a>>;
} = <a>(monoidA: Monoid<a>): Monoid<Dual<a>> => ({
	...makeSemigroupDual(monoidA),
	mempty: () => monoidA.mempty() as Dual<a>,
});
