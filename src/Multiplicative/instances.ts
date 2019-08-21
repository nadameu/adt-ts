import { autocurry2 } from '../autocurry';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append: Semigroup<number>['append'] = autocurry2((x, y) => x * y);
export const semigroupMultiplicative = { append } as Semigroup<number>;

const mempty: Monoid<number>['mempty'] = () => 1;
export const monoidMultiplicative = { append, mempty } as Monoid<number>;
