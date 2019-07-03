import { Eq } from './Eq';
import { eqBooleanImpl as eq } from './EqImpl';
import { Ord } from './Ord';
import { ordBooleanImpl as compare } from './OrdImpl';

export const otherwise = true as boolean;

export { eq };
export const eqBoolean: Eq<boolean> = { eq };

export { compare };
export const ordBoolean: Ord<boolean> = { eq, compare };
