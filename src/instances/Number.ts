import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Ordering } from './Ordering';

export const eq: Eq<number>['eq'] = x => y => x === y;
export const notEq = E.notEq<number>({ eq });

export const compare: Ord<number>['compare'] = x => y =>
	eq(x)(y) ? Ordering.EQ : x < y ? Ordering.LT : Ordering.GT;
export const lte = O.lte<number>({ compare });
export const gt = O.gt<number>({ compare });
export const lt = O.lt<number>({ compare });
export const gte = O.gte<number>({ compare });
export const comparing = O.comparing<number>({ compare });
export const min = O.min<number>({ compare });
export const max = O.max<number>({ compare });
export const clamp = O.clamp<number>({ compare });
export const between = O.between<number>({ compare });
