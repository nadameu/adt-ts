import * as EqFns from './Eq';
import { Eq } from './Eq';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const eq = (x: never) => (y: never): boolean => true;
export const eqNever: Eq<never> = { eq };
export const notEq = EqFns.notEq(eqNever);
