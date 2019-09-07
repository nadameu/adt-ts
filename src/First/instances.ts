import { Semigroup_1 } from '../typeclasses';
import { TFirst } from './internal';

export const semigroupFirst = { append: x => _ => x } as Semigroup_1<TFirst>;
