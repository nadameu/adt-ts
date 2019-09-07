import { Monoid_0, Semigroup_0 } from '../typeclasses';

const append: Semigroup_0<boolean>['append'] = x => y => x || y;

export const semigroupDisj = { append } as Semigroup_0<boolean>;
export const monoidDisj = { append, mempty: () => false } as Monoid_0<boolean>;
