import { Semigroup1 } from '../typeclasses/Semigroup';
import { append, mempty } from './functions/original';
import { TList, TNEList } from './internal';
import { Monoid1 } from '../typeclasses/Monoid';

export const semigroupList = { append } as Semigroup1<TList>;
export const semigroupNEList = { append } as Semigroup1<TNEList>;
export const monoidList = { append, mempty } as Monoid1<TList>;
