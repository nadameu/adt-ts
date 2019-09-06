import { Semigroup_1 } from '../typeclasses/Semigroup';
import { TLast } from './internal';

export const semigroupLast = { append: _ => x => x } as Semigroup_1<TLast>;
