import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Show } from './Show';

declare const OrderingSymbol: unique symbol;
export type Ordering = LT | EQ | GT;

export type LT = -1 & { [OrderingSymbol]: 'LT' };
export const LT = -1 as LT;

export type EQ = 0 & { [OrderingSymbol]: 'EQ' };
export const EQ = 0 as EQ;

export type GT = 1 & { [OrderingSymbol]: 'GT' };
export const GT = 1 as GT;

export const eq: (x: Ordering) => (y: Ordering) => boolean = refEq;
export const eqOrdering: Eq<Ordering> = { eq };

export const compare = (x: Ordering) => (y: Ordering): Ordering => (x < y ? LT : x === y ? EQ : GT);
export const ordOrdering: Ord<Ordering> = { eq, compare };

export const top = GT as Ordering;
export const bottom = LT as Ordering;
export const boundedOrdering: Bounded<Ordering> = { eq, compare, top, bottom };

export const show = (x: Ordering): string => (x === LT ? 'LT' : x === EQ ? 'EQ' : 'GT');
export const showOrdering: Show<Ordering> = { show };