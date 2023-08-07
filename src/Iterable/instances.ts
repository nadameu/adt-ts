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
import { TIterable } from './internal';

export const makeEqIterable = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => {
      const ix = xs[Symbol.iterator]();
      const iy = ys[Symbol.iterator]();
      for (;;) {
        const x = ix.next();
        const y = iy.next();
        if (x.done) return y.done;
        if (y.done || !eq.eq(x.value)(y.value)) return false;
      }
    },
  }) as Eq<Iterable<a>>;

export const functorIterable = { map } as Functor_1<TIterable>;
export const applyIterable = { apply, map } as Apply_1<TIterable>;
export const applicativeIterable = { apply, map, pure } as Applicative_1<TIterable>;
export const bindIterable = { apply, bind, map } as Bind_1<TIterable>;
export const monadIterable = { apply, bind, map, pure } as Monad_1<TIterable>;

export const semigroupIterable = { append } as Semigroup_1<TIterable>;
export const monoidIterable = { append, mempty } as Monoid_1<TIterable>;

export const altIterable = { alt, map } as Alt_1<TIterable>;
export const plusIterable = { alt, empty, map } as Plus_1<TIterable>;
export const alternativeIterable = { alt, apply, empty, map, pure } as Alternative_1<TIterable>;

export const foldableIterable = { foldMap, foldl, foldr } as Foldable_1<TIterable>;
export const traversableIterable = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_1<TIterable>;

export const compactableIterable = { compact, separate } as Compactable_1<TIterable>;
export const filterableIterable = {
  compact,
  filter,
  filterMap,
  map,
  partition,
  partitionMap,
} as Filterable_1<TIterable>;
export const witherableIterable = {
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
} as Witherable_1<TIterable>;
