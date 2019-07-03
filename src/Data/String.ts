import { Eq } from './Eq';
import { eqStringImpl } from './EqImpl';
import { Ord } from './Ord';
import { ordStringImpl } from './OrdImpl';
import { Show } from './Show';
import { showStringImpl } from './ShowImpl';

export const eq = eqStringImpl;
export const eqString: Eq<string> = { eq };

export const compare = ordStringImpl;
export const ordString: Ord<string> = { eq, compare };

export const show = showStringImpl;
export const showString: Show<string> = { show };
