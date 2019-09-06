import { Monoid_0 } from '../typeclasses/Monoid';
import { Semigroup_0 } from '../typeclasses/Semigroup';

const append: Semigroup_0<boolean>['append'] = x => y => x || y;

export const semigroupDisj = { append } as Semigroup_0<boolean>;
export const monoidDisj = { append, mempty: () => false } as Monoid_0<boolean>;
