import { Generic1 } from '../../Generic';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Ord } from '../Ord';
import { Semigroup1 } from '../Semigroup';
import { Show } from '../Show';

declare const FirstSymbol: unique symbol;
export type First<a> = a & { [FirstSymbol]: 'First' };
export interface GenericFirst extends Generic1 {
	type: First<this['a']>;
}

export const makeEqFirst = <a>(eqA: Eq<a>): Eq<First<a>> => eqA;
export const makeOrdFirst = <a>(ordA: Ord<a>): Ord<First<a>> => ordA;
export const makeBoundedFirst = <a>(boundedA: Bounded<a>): Bounded<First<a>> => boundedA as any;
export const makeShowFirst = <a>(showA: Show<a>): Show<First<a>> => ({
	show: x => `(First ${showA.show(x)})`,
});

// TODO: Functor, Apply, Applicative, Bind, Monad

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const append = <a>(x: First<a>) => (y: First<a>): First<a> => x;
export const semigroupFirst: Semigroup1<GenericFirst> = { append };