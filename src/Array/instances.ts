import { Alt1 } from '../typeclasses/Alt';
import { Alternative1 } from '../typeclasses/Alternative';
import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Eq } from '../typeclasses/Eq';
import { Foldable1 } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { Monad1 } from '../typeclasses/Monad';
import { Monoid1 } from '../typeclasses/Monoid';
import { Plus1 } from '../typeclasses/Plus';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { Traversable1 } from '../typeclasses/Traversable';
import {
  alt,
  append,
  apply,
  bind,
  empty,
  foldl,
  foldMap,
  foldr,
  map,
  mempty,
  pure,
  sequence,
  traverse,
  compact,
  filter,
  filterMap,
  separate,
  partition,
  partitionMap,
  wither,
  wilt,
} from './functions';
import { TArray } from './internal';
import { Compactable1 } from '../typeclasses/Compactable';
import { Filterable1 } from '../typeclasses/Filterable';
import { Witherable1 } from '../typeclasses/Witherable';

export const makeEqArray = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => xs.length === ys.length && xs.every((_, i) => eq.eq(xs[i])(ys[i])),
  } as Eq<Array<a>>);

export const functorArray = { map } as Functor1<TArray>;
export const applyArray = { apply, map } as Apply1<TArray>;
export const bindArray = { apply, bind, map } as Bind1<TArray>;
export const applicativeArray = { apply, map, pure } as Applicative1<TArray>;
export const monadArray = { apply, bind, map, pure } as Monad1<TArray>;

export const altArray = { alt, map } as Alt1<TArray>;
export const plusArray = { alt, empty, map } as Plus1<TArray>;
export const alternativeArray = { alt, apply, empty, map, pure } as Alternative1<TArray>;

export const foldableArray = { foldMap, foldl, foldr } as Foldable1<TArray>;
export const traversableArray = { foldMap, foldl, foldr, map, sequence, traverse } as Traversable1<
  TArray
>;

export const semigroupArray = { append } as Semigroup1<TArray>;
export const monoidArray = { append, mempty } as Monoid1<TArray>;

export const compactableArray = { compact, separate } as Compactable1<TArray>;
export const filterableArray = {
  compact,
  filter,
  filterMap,
  map,
  partition,
  partitionMap,
  separate,
} as Filterable1<TArray>;
export const witherableArray = {
  compact,
  filter,
  filterMap,
  foldMap,
  foldl,
  foldr,
  map,
  partition,
  partitionMap,
  separate,
  sequence,
  traverse,
  wilt,
  wither,
} as Witherable1<TArray>;
