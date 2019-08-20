import { curry2 } from '../curry';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { TFirst } from './internal';

export const semigroupFirst = { append: curry2((x, _) => x) } as Semigroup1<TFirst>;
