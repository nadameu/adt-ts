import { Semigroup1 } from '../typeclasses/Semigroup';
import { TLast } from './internal';

export const semigroupLast = { append: (_, x) => x } as Semigroup1<TLast>;
