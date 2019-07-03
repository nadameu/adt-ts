import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Show } from './Show';
import { showNumberImpl } from './ShowImpl';

export const eq: (x: number) => (y: number) => boolean = refEq;
export const eqNumber: Eq<number> = { eq };

export const compare: (x: number) => (y: number) => Ordering = unsafeCompareImpl;
export const ordNumber: Ord<number> = { eq, compare };

export const top = Number.POSITIVE_INFINITY;
export const bottom = Number.NEGATIVE_INFINITY;
export const boundedInt: Bounded<number> = { eq, compare, top, bottom };

export const show = showNumberImpl;
export const showNumber: Show<number> = { show };
