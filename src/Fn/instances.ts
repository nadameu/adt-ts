import { Category_2, Semigroupoid_2 } from '../typeclasses';
import { compose, identity } from './functions';
import { TFn } from './internal';

export const semigroupoidFn = { compose } as Semigroupoid_2<TFn>;
export const categoryFn = { compose, identity } as Category_2<TFn>;
