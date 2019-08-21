import { Eq } from '../typeclasses/Eq';
import { Monoid } from '../typeclasses/Monoid';
import { append, eq, mempty } from './functions';

export const eqString = { eq } as Eq<string>;

export const monoidString = { append, mempty } as Monoid<string>;
