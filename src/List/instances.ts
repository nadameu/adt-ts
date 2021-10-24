import {
  Alternative_1,
  Alt_1,
  Applicative_1,
  Apply_1,
  Bind_1,
  Eq,
  Foldable1_1,
  Foldable_1,
  Functor_1,
  Monad_1,
  Monoid_1,
  Plus_1,
  Semigroup_1,
  Traversable_1,
} from '../typeclasses';
import { List } from './definitions';
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
} from './functions/original';
import { TList } from './internal';

/* LIST */
export const makeEqList = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => {
      let ix = xs;
      let iy = ys;
      while (ix.isCons && iy.isCons) {
        if (!eq.eq(ix.head)(iy.head)) return false;
        ix = ix.tail;
        iy = iy.tail;
      }
      return ix.isNil === iy.isNil;
    },
  } as Eq<List<a>>);

export const functorList = { map } as Functor_1<TList>;
export const applyList = { apply, map } as Apply_1<TList>;
export const applicativeList = { apply, map, pure } as Applicative_1<TList>;
export const bindList = { apply, bind, map } as Bind_1<TList>;
export const monadList = { apply, bind, map, pure } as Monad_1<TList>;

export const semigroupList = { append } as Semigroup_1<TList>;
export const monoidList = { append, mempty } as Monoid_1<TList>;

export const altList = { alt, map } as Alt_1<TList>;
export const plusList = { alt, empty, map } as Plus_1<TList>;
export const alternativeList = { alt, apply, empty, map, pure } as Alternative_1<TList>;

export const foldableList = { foldMap, foldl, foldr } as Foldable_1<TList>;
export const traversableList = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_1<TList>;
