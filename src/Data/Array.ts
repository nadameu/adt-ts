import { Alt } from '../Control/Alt';
import { Alternative } from '../Control/Alternative';
import { Applicative } from '../Control/Applicative';
import { Apply } from '../Control/Apply';
import { Bind } from '../Control/Bind';
import { Monad } from '../Control/Monad';
import { MonadZero } from '../Control/MonadZero';
import { Plus } from '../Control/Plus';
import { Generic1 } from '../Generic';
import { Eq } from './Eq';
import { Functor } from './Functor';
import { Monoid1 } from './Monoid';
import { ordNumber } from './Number';
import { Ord } from './Ord';
import { EQ } from './Ordering';
import { Semigroup1 } from './Semigroup';
import { Show } from './Show';

export interface GenericArray extends Generic1 {
	type: this['a'][];
}

export const makeEqArray = <a>(eqA: Eq<a>): Eq<a[]> => ({
	eq: (xs: a[]) => (ys: a[]): boolean =>
		xs.length === ys.length && xs.every((_, i) => eqA.eq(xs[i])(ys[i])),
});

export const makeOrdArray = <a>(ordA: Ord<a>): Ord<a[]> => ({
	...makeEqArray(ordA),
	compare: xs => ys => {
		const xlen = xs.length;
		const ylen = ys.length;
		for (let i = 0; i < xlen && i < ylen; i++) {
			const o = ordA.compare(xs[i])(ys[i]);
			if (o !== EQ) return o;
		}
		return ordNumber.compare(xlen)(ylen);
	},
});

export const makeShowArray = <a>(showA: Show<a>): Show<a[]> => ({
	show: xs => `[${xs.map(showA.show).join(',')}]`,
});

export const append = <a>(xs: a[]) => (ys: a[]): a[] =>
	xs.length === 0 ? ys : ys.length === 0 ? xs : xs.concat(ys);
export const semigroupArray: Semigroup1<GenericArray> = { append };

export const mempty = <a = never>(): a[] => [];
export const monoidArray: Monoid1<GenericArray> = { ...semigroupArray, mempty };

export const map = <a, b>(f: (_: a) => b) => (xs: a[]): b[] => xs.map(x => f(x));
export const functorArray: Functor<GenericArray> = { map };

export const apply = <a, b>(fs: ((_: a) => b)[]) => (xs: a[]): b[] => {
	const ys: b[] = [];
	for (const f of fs) {
		for (const x of xs) {
			ys.push(f(x));
		}
	}
	return ys;
};
export const applyArray: Apply<GenericArray> = { ...functorArray, apply };

export const bind = <a>(xs: a[]) => <b>(f: (_: a) => b[]): b[] => {
	const ys: b[] = [];
	for (const x of xs) {
		Array.prototype.push.apply(ys, f(x));
	}
	return ys;
};
export const bindArray: Bind<GenericArray> = { ...applyArray, bind };

export const pure = <a>(x: a): a[] => [x];
export const applicativeArray: Applicative<GenericArray> = { ...applyArray, pure };

export const monadArray: Monad<GenericArray> = { ...applicativeArray, ...bindArray };

export const alt = append;
export const altArray: Alt<GenericArray> = { ...functorArray, alt: append };

export const empty = mempty;
export const plusArray: Plus<GenericArray> = { ...altArray, empty };

export const alternativeArray: Alternative<GenericArray> = { ...applicativeArray, ...plusArray };

export const monadZeroArray: MonadZero<GenericArray> = { ...monadArray, ...alternativeArray };
