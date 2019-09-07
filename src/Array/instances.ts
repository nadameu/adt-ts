import {
  Alternative_1,
  Alt_1,
  Applicative_1,
  Apply_1,
  Bind_1,
  Compactable_1,
  Eq,
  Filterable_1,
  Foldable_1,
  Functor_1,
  Monad_1,
  Monoid_1,
  Plus_1,
  Semigroup_1,
  Traversable_1,
  Witherable_1,
} from '../typeclasses';
import {
  alt,
  append,
  apply,
  bind,
  compact,
  empty,
  filter,
  filterMap,
  foldl,
  foldMap,
  foldr,
  map,
  mempty,
  partition,
  partitionMap,
  pure,
  separate,
  sequence,
  traverse,
  wilt,
  wither,
} from './functions';
import { TArray } from './internal';

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
