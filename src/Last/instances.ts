import { Semigroup_1 } from '../typeclasses';
import { TLast } from './internal';

export const semigroupLast = { append: _ => x => x } as Semigroup_1<TLast>;
