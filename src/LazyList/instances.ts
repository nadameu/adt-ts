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
import { LazyList } from './definitions';
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
import { TLazyList } from './internal';

export const makeEqLazyList = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => {
      let resultX = xs();
      let resultY = ys();
      while (resultX.isCons && resultY.isCons) {
        if (!eq.eq(resultX.head)(resultY.head)) return false;
        resultX = resultX.tail();
        resultY = resultY.tail();
      }
      return resultX.isCons === resultY.isCons;
    },
  } as Eq<LazyList<a>>);

export const functorLazyList = { map } as Functor_1<TLazyList>;
export const applyLazyList = { apply, map } as Apply_1<TLazyList>;
export const bindLazyList = { apply, bind, map } as Bind_1<TLazyList>;
export const applicativeLazyList = { apply, map, pure } as Applicative_1<TLazyList>;
export const monadLazyList = { apply, bind, map, pure } as Monad_1<TLazyList>;

export const altLazyList = { alt, map } as Alt_1<TLazyList>;
export const plusLazyList = { alt, empty, map } as Plus_1<TLazyList>;
export const alternativeLazyList = { alt, apply, empty, map, pure } as Alternative_1<TLazyList>;

export const semigroupLazyList = { append } as Semigroup_1<TLazyList>;
export const monoidLazyList = { append, mempty } as Monoid_1<TLazyList>;

export const foldableLazyList = { foldMap, foldl, foldr } as Foldable_1<TLazyList>;
export const traversableLazyList = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_1<TLazyList>;
