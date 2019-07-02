import { Generic1 } from '../Generic';
import * as EqFns from './Eq';
import { Eq, Eq1 } from './Eq';
import { eqArrayImpl } from './EqImpl';

export interface GenericArray extends Generic1 {
	type: this['a'][];
}

export const eq1 = <a>(eqA: Eq<a>): ((xs: a[]) => (ys: a[]) => boolean) => eqArrayImpl(eqA.eq);
export const eq1Array: Eq1<GenericArray> = { eq1 };
export const notEq1 = EqFns.notEq1(eq1Array);
