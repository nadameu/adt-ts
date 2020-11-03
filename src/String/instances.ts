import { Eq, Monoid_0, Semigroup_0 } from '../typeclasses';
import { append, eq, mempty } from './functions';

export const eqString = { eq } as Eq<string>;

export const semigroupString = { append } as Semigroup_0<string>;
export const monoidString = { append, mempty } as Monoid_0<string>;
