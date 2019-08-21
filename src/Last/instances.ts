import { autocurry2 } from '../autocurry';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { TLast } from './internal';

export const semigroupLast = { append: autocurry2((_, x) => x) } as Semigroup1<TLast>;
