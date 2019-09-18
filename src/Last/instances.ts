import { constant } from '../helpers/constant';
import { identity } from '../helpers/identity';
import { Semigroup_1 } from '../typeclasses';
import { TLast } from './internal';

export const semigroupLast = { append: constant(identity) } as Semigroup_1<TLast>;
