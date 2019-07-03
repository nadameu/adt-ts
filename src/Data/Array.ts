import { Generic1 } from '../Generic';
import { Eq } from './Eq';
import { eqArrayImpl } from './EqImpl';
import { Ord } from './Ord';
import { ordArrayImpl } from './OrdImpl';

export interface GenericArray extends Generic1 {
	type: this['a'][];
}

export const makeEqArray = <a>(eqA: Eq<a>): Eq<a[]> => ({
	eq: eqArrayImpl(eqA.eq),
});

export const makeOrdArray = <a>(ordA: Ord<a>): Ord<a[]> => ({
	eq: makeEqArray(ordA).eq,
	compare: ordArrayImpl(ordA.compare),
});
