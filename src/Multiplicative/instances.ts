import { Monoid_0, Semigroup_0 } from '../typeclasses';

const append: Semigroup_0<number>['append'] = x => y => x * y;
export const semigroupMultiplicative = { append } as Semigroup_0<number>;

const mempty: Monoid_0<number>['mempty'] = () => 1;
export const monoidMultiplicative = { append, mempty } as Monoid_0<number>;
