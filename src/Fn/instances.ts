import {
  Applicative_2,
  Apply_2,
  Bind_2,
  Category_2,
  Functor_2,
  Monad_2,
  Semigroupoid_2,
} from '../typeclasses';
import { apply, bind, compose, identity, map, pure } from './functions/original';
import { TFn, TFn_ } from './internal';

export const semigroupoidFn = { compose } as Semigroupoid_2<TFn>;
export const categoryFn = { compose, identity } as Category_2<TFn>;

export const functorFn = { map } as Functor_2<TFn_>;
export const applyFn = { apply, map } as Apply_2<TFn_>;
export const bindFn = { apply, bind, map } as Bind_2<TFn_>;
export const applicativeFn = { apply, map, pure } as Applicative_2<TFn_>;
export const monadFn = { apply, bind, map, pure } as Monad_2<TFn_>;
