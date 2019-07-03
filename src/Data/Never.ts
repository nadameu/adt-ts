import { Eq } from './Eq';
import { Ord } from './Ord';
import { Ordering, EQ } from './Ordering';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const eq = (x: never) => (y: never): boolean => true;
export const eqNever: Eq<never> = { eq };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const compare = (x: never) => (y: never): Ordering => EQ;
export const ordNever: Ord<never> = { eq, compare };
