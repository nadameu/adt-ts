import * as EqFns from './Eq';
import { Eq } from './Eq';
import { eqStringImpl as eq } from './EqImpl';

export { eq };
export const eqString: Eq<string> = { eq };
export const notEq = EqFns.notEq(eqString);
