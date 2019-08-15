import { Alt1 } from '../typeclasses/Alt';
import { Alternative1 } from '../typeclasses/Alternative';
import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1 } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { Monad1 } from '../typeclasses/Monad';
import { MonadError1 } from '../typeclasses/MonadError';
import { MonadThrow1 } from '../typeclasses/MonadThrow';
import { Plus1 } from '../typeclasses/Plus';
import { Traversable1 } from '../typeclasses/Traversable';
import {
  alt,
  apply,
  bind,
  catchError,
  empty,
  foldl,
  foldMap,
  foldr,
  map,
  pure,
  sequence,
  throwError,
  traverse,
} from './functions';
import { TMaybe } from './internal';

export { makeEqMaybe } from './instances/eq';

export const functorMaybe = { map } as Functor1<TMaybe>;
export const applyMaybe = { apply, map } as Apply1<TMaybe>;
export const bindMaybe = { apply, bind, map } as Bind1<TMaybe>;
export const applicativeMaybe = { apply, map, pure } as Applicative1<TMaybe>;
export const monadMaybe = { apply, bind, map, pure } as Monad1<TMaybe>;
export const monadThrowMaybe = { apply, bind, map, pure, throwError } as MonadThrow1<TMaybe>;
export const monadErrorMaybe = { apply, bind, catchError, map, pure, throwError } as MonadError1<
  TMaybe
>;
export const foldableMaybe = { foldl, foldMap, foldr } as Foldable1<TMaybe>;
export const altMaybe = { map, alt } as Alt1<TMaybe>;
export const alternativeMaybe = { map, alt, apply, empty, pure } as Alternative1<TMaybe>;
export const plusMaybe = { alt, empty, map } as Plus1<TMaybe>;
export const traversableMaybe = { foldMap, foldl, foldr, map, sequence, traverse } as Traversable1<
  TMaybe
>;
