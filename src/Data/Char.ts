import * as EqFns from './Eq';
import { Eq } from './Eq';
import { eqCharImpl as eq } from './EqImpl';

declare const CharSymbol: unique symbol;
export type Char = string & { [CharSymbol]: 'Char' };

export { eq };
export const eqChar: Eq<Char> = { eq };
export const notEq = EqFns.notEq(eqChar);
