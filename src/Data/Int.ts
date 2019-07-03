import { Eq } from './Eq';
import { eqIntImpl as eq } from './EqImpl';
import { Ord } from './Ord';
import { ordIntImpl as compare } from './OrdImpl';

declare const IntSymbol: unique symbol;
export type Int = number & { [IntSymbol]: 'Int' };

export { eq };
export const eqInt: Eq<Int> = { eq };

export { compare };
export const ordInt: Ord<Int> = { eq, compare };
