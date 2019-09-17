import { constant, identity } from '../helpers';
import { Semigroup_1 } from '../typeclasses';
import { TLast } from './internal';

export const semigroupLast = { append: constant(identity) } as Semigroup_1<TLast>;
