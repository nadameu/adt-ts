import { Eq } from './Eq';
import { eqNumberImpl as eq } from './EqImpl';
import { Ord } from './Ord';
import { ordNumberImpl as compare } from './OrdImpl';

export { eq };
export const eqNumber: Eq<number> = { eq };

export { compare };
export const ordNumber: Ord<number> = { eq, compare };
