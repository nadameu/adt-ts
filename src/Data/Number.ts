import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { eqNumberImpl } from './EqImpl';
import { Ord } from './Ord';
import { ordNumberImpl } from './OrdImpl';
import { Show } from './Show';
import { showNumberImpl } from './ShowImpl';

export const eq = eqNumberImpl;
export const eqNumber: Eq<number> = { eq };

export const compare = ordNumberImpl;
export const ordNumber: Ord<number> = { eq, compare };

export const top = Number.POSITIVE_INFINITY;
export const bottom = Number.NEGATIVE_INFINITY;
export const boundedInt: Bounded<number> = { eq, compare, top, bottom };

export const show = showNumberImpl;
export const showNumber: Show<number> = { show };
