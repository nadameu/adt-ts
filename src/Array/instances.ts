import { Alt_1 } from '../typeclasses/Alt';
import { Alternative_1 } from '../typeclasses/Alternative';
import { Applicative_1 } from '../typeclasses/Applicative';
import { Apply_1 } from '../typeclasses/Apply';
import { Bind_1 } from '../typeclasses/Bind';
import { Eq } from '../typeclasses/Eq';
import { Foldable_1 } from '../typeclasses/Foldable';
import { Functor_1 } from '../typeclasses/Functor';
import { Monad_1 } from '../typeclasses/Monad';
import { Monoid_1 } from '../typeclasses/Monoid';
import { Plus_1 } from '../typeclasses/Plus';
import { Semigroup_1 } from '../typeclasses/Semigroup';
import { Traversable_1 } from '../typeclasses/Traversable';
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
import { Compactable_1 } from '../typeclasses/Compactable';
import { Filterable_1 } from '../typeclasses/Filterable';
import { Witherable_1 } from '../typeclasses/Witherable';

export const makeEqArray = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => {
      const len = xs.length;
      if (len !== ys.length) return false;
      for (let i = 0; i < len; i++) {
        if (!eq.eq(xs[i])(ys[i])) return false;
      }
      return true;
    },
  } as Eq<ArrayLike<a>>);

export const functorArray = { map } as Functor_1<TArray>;
export const applyArray = { apply, map } as Apply_1<TArray>;
export const bindArray = { apply, bind, map } as Bind_1<TArray>;
export const applicativeArray = { apply, map, pure } as Applicative_1<TArray>;
export const monadArray = { apply, bind, map, pure } as Monad_1<TArray>;

export const altArray = { alt, map } as Alt_1<TArray>;
export const plusArray = { alt, empty, map } as Plus_1<TArray>;
export const alternativeArray = { alt, apply, empty, map, pure } as Alternative_1<TArray>;

export const foldableArray = { foldMap, foldl, foldr } as Foldable_1<TArray>;
export const traversableArray = { foldMap, foldl, foldr, map, sequence, traverse } as Traversable_1<
  TArray
>;

export const semigroupArray = { append } as Semigroup_1<TArray>;
export const monoidArray = { append, mempty } as Monoid_1<TArray>;

export const compactableArray = { compact, separate } as Compactable_1<TArray>;
export const filterableArray = {
  compact,
  filter,
  filterMap,
  map,
  partition,
  partitionMap,
  separate,
} as Filterable_1<TArray>;
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
} as Witherable_1<TArray>;
