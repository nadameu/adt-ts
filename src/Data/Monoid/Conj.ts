import { boundedBoolean, eqBoolean, ordBoolean, showBoolean } from '../Boolean';
import { Bounded } from '../Bounded';
import { Eq } from '../Eq';
import { Monoid } from '../Monoid';
import { Ord } from '../Ord';
import { Semigroup } from '../Semigroup';
import { Show } from '../Show';
import { Semiring } from '../Semiring';

declare const ConjSymbol: unique symbol;
export type Conj = boolean & { [ConjSymbol]: 'Conj' };

export const eqConj: Eq<Conj> = eqBoolean;
export const { eq } = eqConj;

export const ordConj: Ord<Conj> = ordBoolean;
export const { compare } = ordConj;

export const boundedConj: Bounded<Conj> = boundedBoolean as any;
export const { top, bottom } = boundedConj;

export const show = (x: Conj): string => `(Conj ${showBoolean.show(x)})`;
export const showConj: Show<Conj> = { show };

// TODO: Functor, Apply, Applicative, Bind, Monad

export const append = (x: Conj) => (y: Conj): Conj => x && y;
export const semigroupConj: Semigroup<Conj> = { append };

export const mempty = (): Conj => true as Conj;
export const monoidConj: Monoid<Conj> = { ...semigroupConj, mempty };

export const semiringConj: Semiring<Conj> = {
	zero: true as Conj,
	one: false as Conj,
	add: x => y => x && y,
	mul: x => y => x || y,
};
