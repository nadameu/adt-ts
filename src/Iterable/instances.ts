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

export const functorIterable = { map } as Functor1<TIterable>;
export const applyIterable = { apply, map } as Apply1<TIterable>;
export const applicativeIterable = { apply, map, pure } as Applicative1<TIterable>;
export const bindIterable = { apply, bind, map } as Bind1<TIterable>;
export const monadIterable = { apply, bind, map, pure } as Monad1<TIterable>;

export const semigroupIterable = { append } as Semigroup1<TIterable>;
export const monoidIterable = { append, mempty } as Monoid1<TIterable>;

export const altIterable = { alt, map } as Alt1<TIterable>;
export const plusIterable = { alt, empty, map } as Plus1<TIterable>;
export const alternativeIterable = { alt, apply, empty, map, pure } as Alternative1<TIterable>;

export const foldableIterable = { foldMap, foldl, foldr } as Foldable1<TIterable>;
export const traversableIterable = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable1<TIterable>;
