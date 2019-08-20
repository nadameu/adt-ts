import { curry2 } from '../curry';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append: Semigroup<number>['append'] = curry2((x, y) => x * y);

export const semigroupMultiplicative = { append } as Semigroup<number>;
export const monoidMultiplicative = { append, mempty: () => 1 } as Monoid<number>;
