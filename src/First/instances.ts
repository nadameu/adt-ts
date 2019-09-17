import { constant } from '../helpers';
import { Semigroup_1 } from '../typeclasses';
import { TFirst } from './internal';

export const semigroupFirst = { append: constant } as Semigroup_1<TFirst>;
