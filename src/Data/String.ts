import { Eq } from './Eq';
import { eqStringImpl as eq } from './EqImpl';
import { Ord } from './Ord';
import { ordStringImpl as compare } from './OrdImpl';

export { eq };
export const eqString: Eq<string> = { eq };

export { compare };
export const ordString: Ord<string> = { eq, compare };
