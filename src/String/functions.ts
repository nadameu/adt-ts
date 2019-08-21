import { Eq } from '../typeclasses/Eq';
import { Semigroup } from '../typeclasses/Semigroup';
import { curry2 } from '../curry';
import { Monoid } from '../typeclasses/Monoid';

export const eq: Eq<string>['eq'] = (a, b) => a === b;

export const append: Semigroup<string>['append'] = curry2((x, y) => `${x}${y}`);

export const mempty: Monoid<string>['mempty'] = () => '';
