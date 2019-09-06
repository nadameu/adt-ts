import { Alt_1 } from '../typeclasses/Alt';
import { Alternative_1 } from '../typeclasses/Alternative';
import { Applicative_1 } from '../typeclasses/Applicative';
import { Apply_1 } from '../typeclasses/Apply';
import { Bind_1 } from '../typeclasses/Bind';
import { Eq } from '../typeclasses/Eq';
import { Foldable_1 } from '../typeclasses/Foldable';
import { Foldable1_1 } from '../typeclasses/Foldable1';
import { Functor_1 } from '../typeclasses/Functor';
import { Monad_1 } from '../typeclasses/Monad';
import { Monoid_1 } from '../typeclasses/Monoid';
import { Plus_1 } from '../typeclasses/Plus';
import { Semigroup_1 } from '../typeclasses/Semigroup';
import { Traversable_1 } from '../typeclasses/Traversable';
import { List, ListTag, NEList } from './definitions';
import {
  alt,
  append,
  apply,
  bind,
  empty,
  fold1,
  foldl,
  foldMap,
  foldMap1,
  foldr,
  map,
  mempty,
  pure,
  sequence,
  traverse,
  uncons,
} from './functions/original';
import { TList, TNEList } from './internal';

/* LIST */
export const makeEqList = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => {
      let ix = uncons(xs);
      let iy = uncons(ys);
      while (ix.tag === ListTag.Cons && iy.tag === ListTag.Cons) {
        if (!eq.eq(ix.head)(iy.head)) return false;
        ix = uncons(ix.tail);
        iy = uncons(iy.tail);
      }
      return (ix.tag === ListTag.Nil) === (iy.tag === ListTag.Nil);
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
export const traversableList = { foldMap, foldl, foldr, map, sequence, traverse } as Traversable_1<
  TList
>;

/* NELIST */
export const makeEqNEList = makeEqList as <a>(eq: Eq<a>) => Eq<NEList<a>>;

export const functorNEList = functorList as Functor_1<TNEList>;
export const applyNEList = applyList as Apply_1<TNEList>;
export const applicativeNEList = applicativeList as Applicative_1<TNEList>;
export const bindNEList = bindList as Bind_1<TNEList>;
export const monadNEList = monadList as Monad_1<TNEList>;

export const semigroupNEList = { append } as Semigroup_1<TNEList>;

export const altNEList = altList as Alt_1<TNEList>;

export const foldableNEList = foldableList as Foldable_1<TNEList>;
export const traversableNEList = traversableList as Traversable_1<TNEList>;

export const foldable1NEList = { fold1, foldMap, foldMap1, foldl, foldr } as Foldable1_1<TNEList>;
