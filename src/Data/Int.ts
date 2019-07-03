import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Show } from './Show';
import { showIntImpl } from './ShowImpl';

declare const IntSymbol: unique symbol;
export type Int = number & { [IntSymbol]: 'Int' };

export const eq: (x: Int) => (y: Int) => boolean = refEq;
export const eqInt: Eq<Int> = { eq };

export const compare: (x: Int) => (y: Int) => Ordering = unsafeCompareImpl;
export const ordInt: Ord<Int> = { eq, compare };

export const top = 2147483647 as Int;
export const bottom = -2147483648 as Int;
export const boundedInt: Bounded<Int> = { eq, compare, top, bottom };

export const show = showIntImpl;
export const showInt: Show<Int> = { show };
