import { Eq } from '../typeclasses/Eq';
import { Monoid_0 } from '../typeclasses/Monoid';
import { Semigroup_0 } from '../typeclasses/Semigroup';

export const eq: Eq<string>['eq'] = a => b => a === b;

export const append: Semigroup_0<string>['append'] = x => y => `${x}${y}`;

export const mempty: Monoid_0<string>['mempty'] = () => '';
