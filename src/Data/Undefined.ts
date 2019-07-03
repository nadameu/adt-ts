import { Eq } from './Eq';
import { Ordering, EQ } from './Ordering';
import { Ord } from './Ord';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const eq = (x: undefined) => (y: undefined): boolean => true;
export const eqUndefined: Eq<undefined> = { eq };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const compare = (x: undefined) => (y: undefined): Ordering => EQ;
export const ordUndefined: Ord<undefined> = { eq, compare };
