import { curry2 } from '../curry';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append: Semigroup<boolean>['append'] = curry2((x: boolean, y: boolean) => x && y);

export const semigroupConj = { append } as Semigroup<boolean>;
export const monoidConj = { append, mempty: () => true } as Monoid<boolean>;
