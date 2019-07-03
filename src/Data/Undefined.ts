import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { Ord } from './Ord';
import { EQ, Ordering } from './Ordering';
import { Show } from './Show';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const eq = (x: undefined) => (y: undefined): boolean => true;
export const eqUndefined: Eq<undefined> = { eq };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const compare = (x: undefined) => (y: undefined): Ordering => EQ;
export const ordUndefined: Ord<undefined> = { eq, compare };

export const top = undefined;
export const bottom = undefined;
export const boundedUndefined: Bounded<undefined> = { eq, compare, top, bottom };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const show = (x: undefined): string => 'undefined';
export const showUndefined: Show<undefined> = { show };
