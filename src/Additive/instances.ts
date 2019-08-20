import { curry2 } from '../curry';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append: Semigroup<number>['append'] = curry2((x: number, y: number) => x + y);

export const semigroupAdditive = { append } as Semigroup<number>;

export const monoidAdditive = { append, mempty: () => 0 } as Monoid<number>;
