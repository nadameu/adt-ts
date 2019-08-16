import { Category2 } from '../typeclasses/Category';
import { Semigroupoid2 } from '../typeclasses/Semigroupoid';
import { compose, identity } from './functions';
import { TFn } from './internal';

export const semigroupoidFn = { compose } as Semigroupoid2<TFn>;
export const categoryFn = { compose, identity } as Category2<TFn>;
