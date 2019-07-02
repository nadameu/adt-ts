import * as EqFns from './Eq';
import { Eq } from './Eq';
import { eqNumberImpl as eq } from './EqImpl';

export { eq };
export const eqNumber: Eq<number> = { eq };
export const notEq = EqFns.notEq(eqNumber);
