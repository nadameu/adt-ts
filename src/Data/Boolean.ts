import { Eq } from './Eq';
import { eqBooleanImpl } from './EqImpl';
import { Ord } from './Ord';
import { ordBooleanImpl } from './OrdImpl';
import { Show } from './Show';

export const otherwise = true as boolean;

export const eq = eqBooleanImpl;
export const eqBoolean: Eq<boolean> = { eq };

export const compare = ordBooleanImpl;
export const ordBoolean: Ord<boolean> = { eq, compare };

export const show = (x: boolean): string => (x ? 'true' : 'false');
export const showBoolean: Show<boolean> = { show };
