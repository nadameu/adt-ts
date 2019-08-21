import { Monoid0 } from '../typeclasses/Monoid';
import { Semigroup0 } from '../typeclasses/Semigroup';

const append: Semigroup0<number>['append'] = x => y => x * y;
export const semigroupMultiplicative = { append } as Semigroup0<number>;

const mempty: Monoid0<number>['mempty'] = () => 1;
export const monoidMultiplicative = { append, mempty } as Monoid0<number>;
