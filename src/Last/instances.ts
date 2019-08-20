import { curry2 } from '../curry';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { TLast } from './internal';

export const semigroupLast = { append: curry2((_, x) => x) } as Semigroup1<TLast>;
