import { Eq } from '../typeclasses/Eq';
import { Monoid0 } from '../typeclasses/Monoid';
import { Semigroup0 } from '../typeclasses/Semigroup';

export const eq: Eq<string>['eq'] = a => b => a === b;

export const append: Semigroup0<string>['append'] = x => y => `${x}${y}`;

export const mempty: Monoid0<string>['mempty'] = () => '';
