import { Generic1, Type } from '../../Generic';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Functor } from '../Functor';
import { Ord } from '../Ord';
import { Semigroup1 } from '../Semigroup';
import { Show } from '../Show';

declare const LastSymbol: unique symbol;
export type Last<a> = a & { [LastSymbol]: 'Last' };
export interface GenericLast extends Generic1 {
	type: Last<this['a']>;
}
export interface HigherKindedLast<f extends Generic1> extends Generic1 {
	type: Last<Type<f, this['a']>>;
}

export const makeEqLast = <a>(eqA: Eq<a>): Eq<Last<a>> => eqA;
export const makeOrdLast = <a>(ordA: Ord<a>): Ord<Last<a>> => ordA;
export const makeBoundedLast = <a>(boundedA: Bounded<a>): Bounded<Last<a>> => boundedA as any;
export const makeShowLast = <a>(showA: Show<a>): Show<Last<a>> => ({
	show: x => `(Last ${showA.show(x)})`,
});

export const makeFunctorLast = <f extends Generic1>(
	functor: Functor<f>,
): Functor<HigherKindedLast<f>> => functor as any;

// TODO:  Apply, Applicative, Bind, Monad

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const append = <a>(x: Last<a>) => (y: Last<a>): Last<a> => y;
export const semigroupLast: Semigroup1<GenericLast> = { append };
