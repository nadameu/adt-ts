import { autocurry2 } from '../autocurry';
import { Eq } from '../typeclasses/Eq';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

export const eq: Eq<string>['eq'] = (a, b) => a === b;

export const append: Semigroup<string>['append'] = autocurry2((x, y) => `${x}${y}`);

export const mempty: Monoid<string>['mempty'] = () => '';
