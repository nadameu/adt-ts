import { curry2 } from '../curry';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append: Semigroup<boolean>['append'] = curry2((x: boolean, y: boolean) => x || y);

export const semigroupDisj = { append } as Semigroup<boolean>;
export const monoidDisj = { append, mempty: () => false } as Monoid<boolean>;
