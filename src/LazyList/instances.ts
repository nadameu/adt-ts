import {
  Alternative_1,
  Alt_1,
  Applicative_1,
  Apply_1,
  Bind_1,
  Eq,
  Foldable_1,
  Functor_1,
  Monad_1,
  Monoid_1,
  Plus_1,
  Semigroup_1,
  Traversable_1,
} from '../typeclasses';
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
