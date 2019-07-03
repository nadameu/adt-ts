import { Eq } from './Eq';
import { eqCharImpl } from './EqImpl';
import { Ord } from './Ord';
import { ordCharImpl } from './OrdImpl';
import { Show } from './Show';
import { showCharImpl } from './ShowImpl';

declare const CharSymbol: unique symbol;
export type Char = string & { [CharSymbol]: 'Char' };

export const eq = eqCharImpl;
export const eqChar: Eq<Char> = { eq };

export const compare = ordCharImpl;
export const ordChar: Ord<Char> = { eq, compare };

export const show = showCharImpl;
export const showChar: Show<Char> = { show };
