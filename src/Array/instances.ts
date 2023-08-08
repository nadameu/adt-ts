import {
  Alt_A,
  Alternative_A,
  Applicative_A,
  Apply_A,
  Bind_A,
  Compactable_A,
  Eq,
  Filterable_1,
  Foldable_A,
  Functor_A,
  Monad_A,
  Monoid_A,
  Plus_A,
  Semigroup_A,
  Traversable_A,
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
  foldMap,
  foldl,
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
} from './functions/original';
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
  }) as Eq<a[]>;

export const functorArray = { map } as Functor_A;
export const applyArray = { apply, map } as Apply_A;
export const bindArray = { apply, bind, map } as Bind_A;
export const applicativeArray = { apply, map, pure } as Applicative_A;
export const monadArray = { apply, bind, map, pure } as Monad_A;

export const altArray = { alt, map } as Alt_A;
export const plusArray = { alt, empty, map } as Plus_A;
export const alternativeArray = { alt, apply, empty, map, pure } as Alternative_A;

export const foldableArray = { foldMap, foldl, foldr } as Foldable_A;
export const traversableArray = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_A;

export const semigroupArray = { append } as Semigroup_A;
export const monoidArray = { append, mempty } as Monoid_A;

export const compactableArray = { compact, separate } as Compactable_A;
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
