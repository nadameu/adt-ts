import { Eq } from './Eq';
import { refEq } from './EqImpl';
import { Ord } from './Ord';
import { Ordering } from './Ordering';
import { unsafeCompareImpl } from './OrdImpl';
import { Show } from './Show';
import { showStringImpl } from './ShowImpl';

export const eq: (x: string) => (y: string) => boolean = refEq;
export const eqString: Eq<string> = { eq };

export const compare: (x: string) => (y: string) => Ordering = unsafeCompareImpl;
export const ordString: Ord<string> = { eq, compare };

export const show = showStringImpl;
export const showString: Show<string> = { show };
