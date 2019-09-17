import { compose } from '../helpers';
import { Monoid_1, Semigroup_1 } from '../typeclasses';
import { TEndo } from './internal';

export const semigroupEndo = { append: compose } as Semigroup_1<TEndo>;
export const monoidEndo = { append: compose, mempty: () => a => a } as Monoid_1<TEndo>;
