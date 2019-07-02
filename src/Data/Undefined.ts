import * as EqFns from './Eq';
import { Eq } from './Eq';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const eq = (x: undefined) => (y: undefined): boolean => true;
export const eqUndefined: Eq<undefined> = { eq };
export const notEq = EqFns.notEq(eqUndefined);
