import * as EqFns from './Eq';
import { Eq } from './Eq';
import { Ord } from './Ord';

declare const OrderingSymbol: unique symbol;
export type Ordering = LT | EQ | GT;

export type LT = -1 & { [OrderingSymbol]: 'LT' };
export const LT = -1 as LT;

export type EQ = 0 & { [OrderingSymbol]: 'EQ' };
export const EQ = 0 as EQ;

export type GT = 1 & { [OrderingSymbol]: 'GT' };
export const GT = 1 as GT;

export const eq = (x: Ordering) => (y: Ordering): boolean => x === y;
export const eqOrdering: Eq<Ordering> = { eq };
export const notEq = EqFns.notEq(eqOrdering);

export const compare = (x: Ordering) => (y: Ordering): Ordering => (x < y ? LT : x === y ? EQ : GT);
export const ordOrdering: Ord<Ordering> = { eq, compare };
