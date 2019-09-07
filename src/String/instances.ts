import { Eq, Monoid_0 } from '../typeclasses';
import { append, eq, mempty } from './functions';

export const eqString = { eq } as Eq<string>;

export const monoidString = { append, mempty } as Monoid_0<string>;
