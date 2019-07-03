import { Eq } from './Eq';
import { eqCharImpl as eq } from './EqImpl';
import { Ord } from './Ord';
import { ordCharImpl as compare } from './OrdImpl';

declare const CharSymbol: unique symbol;
export type Char = string & { [CharSymbol]: 'Char' };

export { eq };
export const eqChar: Eq<Char> = { eq };

export { compare };
export const ordChar: Ord<Char> = { eq, compare };
