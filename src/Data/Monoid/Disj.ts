import { boundedBoolean, eqBoolean, ordBoolean, showBoolean } from '../Boolean';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Monoid } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup } from '../Semigroup';
import { Show } from '../Show';
import { Semiring } from '../Semiring';

declare const DisjSymbol: unique symbol;
export type Disj = boolean & { [DisjSymbol]: 'Disj' };

export const eqDisj: Eq<Disj> = eqBoolean;
export const { eq } = eqDisj;

export const ordDisj: Ord<Disj> = ordBoolean;
export const { compare } = ordDisj;

export const boundedDisj: Bounded<Disj> = boundedBoolean as any;
export const { top, bottom } = boundedDisj;

export const show = (x: Disj): string => `(Disj ${showBoolean.show(x)})`;
export const showDisj: Show<Disj> = { show };

// TODO: Functor, Apply, Applicative, Bind, Monad

export const append = (x: Disj) => (y: Disj): Disj => x || y;
export const semigroupDisj: Semigroup<Disj> = { append };

export const mempty = (): Disj => false as Disj;
export const monoidDisj: Monoid<Disj> = { ...semigroupDisj, mempty };

export const semiringDisj: Semiring<Disj> = {
	zero: false as Disj,
	one: true as Disj,
	add: x => y => x || y,
	mul: x => y => x && y,
};
