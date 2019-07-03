import { Eq } from './Eq';
import { eqIntImpl } from './EqImpl';
import { Ord } from './Ord';
import { ordIntImpl } from './OrdImpl';
import { Show } from './Show';
import { showIntImpl } from './ShowImpl';

declare const IntSymbol: unique symbol;
export type Int = number & { [IntSymbol]: 'Int' };

export const eq = eqIntImpl;
export const eqInt: Eq<Int> = { eq };

export const compare = ordIntImpl;
export const ordInt: Ord<Int> = { eq, compare };

export const show = showIntImpl;
export const showInt: Show<Int> = { show };
