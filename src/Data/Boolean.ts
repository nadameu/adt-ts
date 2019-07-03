import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { ordBooleanImpl } from './OrdImpl';
import { Show } from './Show';

export const otherwise = true as boolean;

export const eq: (x: boolean) => (y: boolean) => boolean = refEq;
export const eqBoolean: Eq<boolean> = { eq };

export const compare = ordBooleanImpl;
export const ordBoolean: Ord<boolean> = { eq, compare };

export const top = true as boolean;
export const bottom = false as boolean;
export const boundedBoolean: Bounded<boolean> = { eq, compare, top, bottom };

export const show = (x: boolean): string => (x ? 'true' : 'false');
export const showBoolean: Show<boolean> = { show };
