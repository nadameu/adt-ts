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
} from './functions/original';
import { TArrayLike } from './internal';

export const makeEqArrayLike = <a>(eq: Eq<a>) =>
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

export const functorArrayLike = { map } as Functor_1<TArrayLike>;
export const applyArrayLike = { apply, map } as Apply_1<TArrayLike>;
export const bindArrayLike = { apply, bind, map } as Bind_1<TArrayLike>;
export const applicativeArrayLike = { apply, map, pure } as Applicative_1<TArrayLike>;
export const monadArrayLike = { apply, bind, map, pure } as Monad_1<TArrayLike>;

export const altArrayLike = { alt, map } as Alt_1<TArrayLike>;
export const plusArrayLike = { alt, empty, map } as Plus_1<TArrayLike>;
export const alternativeArrayLike = { alt, apply, empty, map, pure } as Alternative_1<TArrayLike>;

export const foldableArrayLike = { foldMap, foldl, foldr } as Foldable_1<TArrayLike>;
export const traversableArrayLike = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_1<TArrayLike>;

export const semigroupArrayLike = { append } as Semigroup_1<TArrayLike>;
export const monoidArrayLike = { append, mempty } as Monoid_1<TArrayLike>;

export const compactableArrayLike = { compact, separate } as Compactable_1<TArrayLike>;
export const filterableArrayLike = {
  compact,
  filter,
  filterMap,
  map,
  partition,
  partitionMap,
  separate,
} as Filterable_1<TArrayLike>;
export const witherableArrayLike = {
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
} as Witherable_1<TArrayLike>;
