import * as EqFns from './Eq';
import { Eq } from './Eq';
import { eqBooleanImpl as eq } from './EqImpl';

export const otherwise = true as boolean;

export { eq };
export const eqBoolean: Eq<boolean> = { eq };
export const notEq = EqFns.notEq(eqBoolean);
