import { compose } from '../Fn/functions';
import { Monoid_1 } from '../typeclasses/Monoid';
import { Semigroup_1 } from '../typeclasses/Semigroup';
import { TEndo } from './internal';

export const semigroupEndo = { append: compose } as Semigroup_1<TEndo>;
export const monoidEndo = { append: compose, mempty: () => a => a } as Monoid_1<TEndo>;
