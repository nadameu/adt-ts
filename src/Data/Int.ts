import * as EqFns from './Eq';
import { Eq } from './Eq';
import { eqIntImpl as eq } from './EqImpl';

declare const IntSymbol: unique symbol;
export type Int = number & { [IntSymbol]: 'Int' };

export { eq };
export const eqInt: Eq<Int> = { eq };
export const notEq = EqFns.notEq(eqInt);
