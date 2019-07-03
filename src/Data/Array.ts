import { Generic1 } from '../Generic';
import { Eq } from './Eq';
import { ordNumber } from './Number';
import { Ord } from './Ord';
import { EQ } from './Ordering';
import { Show } from './Show';
import { showArrayImpl } from './ShowImpl';

export interface GenericArray extends Generic1 {
	type: this['a'][];
}

export const makeEqArray = <a>(eqA: Eq<a>): Eq<a[]> => ({
	eq: (xs: a[]) => (ys: a[]): boolean =>
		xs.length === ys.length && xs.every((_, i) => eqA.eq(xs[i])(ys[i])),
});

export const makeOrdArray = <a>(ordA: Ord<a>): Ord<a[]> => ({
	eq: makeEqArray(ordA).eq,
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
	show: showArrayImpl(showA.show),
});
