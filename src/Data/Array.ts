import { Generic1 } from '../Generic';
import { Eq } from './Eq';
import { Ord } from './Ord';
import { ordArrayImpl } from './OrdImpl';
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
	compare: ordArrayImpl(ordA.compare),
});

export const makeShowArray = <a>(showA: Show<a>): Show<a[]> => ({
	show: showArrayImpl(showA.show),
});
