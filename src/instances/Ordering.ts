import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Semigroup } from '../classes/Semigroup';

export const enum Ordering {
	LT = -1,
	EQ = 0,
	GT = 1,
}

export const eq: Eq<Ordering>['eq'] = x => y => x === y;
export const notEq = E.notEq<Ordering>({ eq });

export const compare: Ord<Ordering>['compare'] = x => y => (x === Ordering.EQ ? y : x);
export const lte = O.lte<Ordering>({ compare });
export const gt = O.gt<Ordering>({ compare });
export const lt = O.lt<Ordering>({ compare });
export const gte = O.gte<Ordering>({ compare });
export const comparing = O.comparing<Ordering>({ compare });
export const min = O.min<Ordering>({ compare });
export const max = O.max<Ordering>({ compare });
export const clamp = O.clamp<Ordering>({ compare });
export const between = O.between<Ordering>({ compare });

export const append: Semigroup<Ordering>['append'] = x => y => (x === Ordering.EQ ? y : x);

export const invert: (x: Ordering) => Ordering = x => (x === Ordering.EQ ? x : x * -1);
