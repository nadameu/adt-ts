import { Monoid_0, Semigroup_0 } from '../typeclasses';

const append: Semigroup_0<boolean>['append'] = x => y => x && y;

export const semigroupConj = { append } as Semigroup_0<boolean>;
export const monoidConj = { append, mempty: () => true } as Monoid_0<boolean>;
