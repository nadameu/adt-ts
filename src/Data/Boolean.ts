import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Show } from './Show';

export const otherwise = true as boolean;

export const eq: (x: boolean) => (y: boolean) => boolean = refEq;
export const eqBoolean: Eq<boolean> = { eq };

export const compare: (x: boolean) => (y: boolean) => Ordering = unsafeCompareImpl;
export const ordBoolean: Ord<boolean> = { ...eqBoolean, compare };

export const top = true as boolean;
export const bottom = false as boolean;
export const boundedBoolean: Bounded<boolean> = { ...ordBoolean, top, bottom };

export const show = (x: boolean): string => (x ? 'true' : 'false');
export const showBoolean: Show<boolean> = { show };
