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
} from './functions';
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
        if (y.done) return false;
        if (!eq.eq(x.value)(y.value)) return false;
      }
    },
  } as Eq<Iterable<a>>);

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
