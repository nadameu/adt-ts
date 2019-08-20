import { Semigroup1 } from '../typeclasses/Semigroup';
import { TFirst } from './internal';

export const semigroupFirst = { append: (x, _) => x } as Semigroup1<TFirst>;
