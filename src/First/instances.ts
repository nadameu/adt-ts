import { autocurry2 } from '../autocurry';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { TFirst } from './internal';

export const semigroupFirst = { append: autocurry2((x, _) => x) } as Semigroup1<TFirst>;
