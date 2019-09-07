import { Eq, Monoid_0, Semigroup_0 } from '../typeclasses';

export const eq: Eq<string>['eq'] = a => b => a === b;

export const append: Semigroup_0<string>['append'] = x => y => `${x}${y}`;

export const mempty: Monoid_0<string>['mempty'] = () => '';
