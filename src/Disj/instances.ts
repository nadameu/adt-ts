import { Monoid0 } from '../typeclasses/Monoid';
import { Semigroup0 } from '../typeclasses/Semigroup';

const append: Semigroup0<boolean>['append'] = x => y => x || y;

export const semigroupDisj = { append } as Semigroup0<boolean>;
export const monoidDisj = { append, mempty: () => false } as Monoid0<boolean>;
