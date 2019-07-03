import { Bounded } from './Bounded';
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

export const top = String.fromCharCode(65535) as Char;
export const bottom = String.fromCharCode(0) as Char;
export const boundedChar: Bounded<Char> = { eq, compare, top, bottom };

export const show = showCharImpl;
export const showChar: Show<Char> = { show };
