import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Ordering } from './Ordering';

export const eq: Eq<boolean>['eq'] = x => y => x === y;
export const notEq = E.notEq({ eq });

export const compare: Ord<boolean>['compare'] = x => y =>
	x === y ? Ordering.EQ : x < y ? Ordering.LT : Ordering.GT;
export const lte = O.lte<boolean>({ compare });
export const gt = O.gt<boolean>({ compare });
export const lt = O.lt<boolean>({ compare });
export const gte = O.gte<boolean>({ compare });
export const comparing = O.comparing<boolean>({ compare });
export const min = O.min<boolean>({ compare });
export const max = O.max<boolean>({ compare });
export const clamp = O.clamp<boolean>({ compare });
export const between = O.between<boolean>({ compare });
