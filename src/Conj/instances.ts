import { Monoid0 } from '../typeclasses/Monoid';
import { Semigroup0 } from '../typeclasses/Semigroup';

const append: Semigroup0<boolean>['append'] = x => y => x && y;

export const semigroupConj = { append } as Semigroup0<boolean>;
export const monoidConj = { append, mempty: () => true } as Monoid0<boolean>;
